import type { ReactNode } from 'react'
import { HeaderUtilities } from '@/components/header/header-utilities'
import { cn } from '@/lib/utils'

interface PageHeaderProps {
  title: string
  description?: ReactNode
  actions?: ReactNode
  className?: string
}

/** The screen's h1 row. On desktop it also carries the header utilities; on phones they live in the top bar. */
export function PageHeader({ title, description, actions, className }: PageHeaderProps) {
  return (
    <header className={cn('flex items-start justify-between gap-4', className)}>
      <div className="min-w-0">
        <h1 className="text-2xl font-extrabold tracking-tight lg:text-[28px] lg:leading-9">{title}</h1>
        {description && <p className="mt-1 text-[15px] text-muted-foreground">{description}</p>}
      </div>
      <div className="flex shrink-0 items-center gap-2">
        {actions}
        <div className="hidden lg:block">
          <HeaderUtilities />
        </div>
      </div>
    </header>
  )
}
