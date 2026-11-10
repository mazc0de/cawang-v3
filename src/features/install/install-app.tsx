import { CircleCheck, Download, Share, SquarePlus } from 'lucide-react'
import { type ReactNode, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useInstallPrompt } from './install-prompt'

/** iOS has no install prompt, so walk through Share → Add to Home Screen. */
function IosInstallDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const { t } = useTranslation()
  const steps = [
    { icon: Share, text: t('install.iosStepShare') },
    { icon: SquarePlus, text: t('install.iosStepAdd') },
    { icon: CircleCheck, text: t('install.iosStepConfirm') },
  ]
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('install.iosTitle')}</DialogTitle>
          <DialogDescription>{t('install.iosBody')}</DialogDescription>
        </DialogHeader>
        <ol className="flex flex-col gap-3">
          {steps.map((step, index) => (
            <li key={index} className="flex items-center gap-3">
              <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                <step.icon className="size-4" />
              </span>
              <span>{step.text}</span>
            </li>
          ))}
        </ol>
        <DialogFooter showCloseButton />
      </DialogContent>
    </Dialog>
  )
}

/** Opens the right install flow; null when the app can't be installed from here. */
function useInstallAction() {
  const { t } = useTranslation()
  const { status, install } = useInstallPrompt()
  const [iosOpen, setIosOpen] = useState(false)

  const run = async () => {
    if (status === 'ios') return setIosOpen(true)
    const outcome = await install()
    if (outcome === 'accepted') toast.success(t('install.done'))
  }

  const dialog = <IosInstallDialog open={iosOpen} onOpenChange={setIosOpen} />
  return { status, run, dialog, available: status === 'prompt' || status === 'ios' }
}

/** The Settings card: always says where things stand, even when there is nothing to press. */
export function InstallAppSetting() {
  const { t } = useTranslation()
  const { status, run, dialog, available } = useInstallAction()

  let message: ReactNode
  if (status === 'installed') {
    message = (
      <span className="flex items-center gap-2">
        <CircleCheck className="size-4 shrink-0 text-income" />
        {t('install.installed')}
      </span>
    )
  } else if (status === 'unsupported') {
    message = t('install.unsupported')
  } else {
    message = status === 'ios' ? t('install.iosHint') : t('install.promptHint')
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
      <p className="text-sm text-muted-foreground">{message}</p>
      {available && (
        <Button className="shrink-0" onClick={run}>
          <Download />
          {t('install.button')}
        </Button>
      )}
      {dialog}
    </div>
  )
}

/** A menu entry for the sidebar and the mobile "More" sheet; hidden unless installing is possible. */
export function InstallAppMenuItem({
  className,
  iconClassName,
  listItem = false,
}: {
  className: string
  iconClassName: string
  /** Wrap in an `<li>` for use inside a list. */
  listItem?: boolean
}) {
  const { t } = useTranslation()
  const { run, dialog, available } = useInstallAction()
  if (!available) return null
  const content = (
    <>
      <button type="button" onClick={run} className={className}>
        <Download className={iconClassName} strokeWidth={1.75} />
        {t('install.button')}
      </button>
      {dialog}
    </>
  )
  return listItem ? <li>{content}</li> : content
}
