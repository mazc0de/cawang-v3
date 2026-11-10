import { useSyncExternalStore } from 'react'

/** Chromium's install event; not in the DOM typings. */
interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

/**
 * - `installed`: already running as the installed app.
 * - `prompt`: the browser handed over its install prompt (Chrome, Edge, Samsung Internet).
 * - `ios`: iOS has no install prompt; the user adds it from the Share menu.
 * - `unsupported`: no way to install from here (Firefox desktop, or the browser hasn't offered it yet).
 */
export type InstallStatus = 'installed' | 'prompt' | 'ios' | 'unsupported'

let deferred: BeforeInstallPromptEvent | null = null
let installed = false
let status: InstallStatus = 'unsupported'
const listeners = new Set<() => void>()

function isStandalone() {
  return matchMedia('(display-mode: standalone)').matches || (navigator as { standalone?: boolean }).standalone === true
}

function isIos() {
  // iPadOS reports itself as a Mac; touch support gives it away.
  return /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
}

function update() {
  status = installed || isStandalone() ? 'installed' : deferred ? 'prompt' : isIos() ? 'ios' : 'unsupported'
  listeners.forEach((listener) => listener())
}

// Listen at import time: the browser fires `beforeinstallprompt` once, early, often before React mounts.
// main.tsx imports this module first for that reason.
if (typeof window !== 'undefined') {
  window.addEventListener('beforeinstallprompt', (event) => {
    // Hold the prompt for our own button instead of the browser's mini-infobar.
    event.preventDefault()
    deferred = event as BeforeInstallPromptEvent
    update()
  })
  window.addEventListener('appinstalled', () => {
    installed = true
    deferred = null
    update()
  })
  matchMedia('(display-mode: standalone)').addEventListener('change', update)
  update()
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

/** Shows the browser's install prompt. A prompt can be used once, so it is dropped afterwards. */
async function install(): Promise<'accepted' | 'dismissed' | 'unavailable'> {
  const event = deferred
  if (!event) return 'unavailable'
  deferred = null
  await event.prompt()
  const { outcome } = await event.userChoice
  update()
  return outcome
}

export function useInstallPrompt() {
  const current = useSyncExternalStore(subscribe, () => status, () => 'unsupported' as const)
  return { status: current, install }
}
