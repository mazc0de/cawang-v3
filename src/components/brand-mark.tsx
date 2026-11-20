import { cn } from '@/lib/utils'

/**
 * The Cawang logo: a branch ("cawang", "cabang") growing three gold coins. Drawn from
 * public/favicon.svg without its square ground. The stem takes `--logo-stem` (the branch
 * green on light grounds, a lighter leaf green inside the shell band); the coins keep the
 * logo's gold everywhere.
 */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="23 34 158 158"
      aria-hidden="true"
      className={cn('size-8 shrink-0', className)}
      style={{ stroke: 'var(--logo-stem, #2f6b2f)' }}
    >
      <g fill="none" strokeLinecap="round">
        <path d="M100 182V90" strokeWidth="14" />
        <path d="M100 146C100 124 82 112 64 106" strokeWidth="12" />
        <path d="M100 126C100 104 120 92 138 86" strokeWidth="12" />
      </g>
      <g stroke="none" fill="#e9b21a">
        <circle cx="52" cy="100" r="22" />
        <circle cx="150" cy="80" r="24" />
        <circle cx="100" cy="62" r="26" />
      </g>
      <g fill="none" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="4">
        <circle cx="52" cy="100" r="12" />
        <circle cx="150" cy="80" r="13" />
        <circle cx="100" cy="62" r="14" />
      </g>
    </svg>
  )
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2 text-[17px] font-extrabold tracking-tight', className)}>
      <BrandMark className="size-7" />
      Cawang
    </span>
  )
}
