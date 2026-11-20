import { format } from 'date-fns'
import { useLayoutEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'
import { currentLanguage } from '@/i18n'
import type { Cycle } from '@/lib/cycle'
import type { Transaction } from '@/lib/database'
import { addDays, diffInDays, type IsoDate, isoDateToLocalDate, zonedParts } from '@/lib/dates'
import { dateLocale, formatDate } from '@/lib/format'
import { cn } from '@/lib/utils'

/** Tallest spending bar, in px. Every day is drawn on the same ramp, and the Cycle's heaviest day fills it. */
const BAR_MAX = 18

interface CycleStripProps {
  cycle: Cycle
  today: IsoDate
  transactions: Transaction[]
  timezone: string
  /** Due Dates of pending Safe-Pays; those days carry a gold dot. */
  dueDates: ReadonlySet<IsoDate>
  /** Days up to today open their Transactions; off for sample strips on public pages. */
  linkDays?: boolean
  className?: string
}

/**
 * Every day of the Cycle in one row, payday first: the payday ringed, today filled, a bar for
 * each day's spending and a gold dot where a pending Safe-Pay falls due. Days up to today open
 * that date's Transactions. The row scrolls itself so today sits in view.
 */
export function CycleStrip({ cycle, today, transactions, timezone, dueDates, linkDays = true, className }: CycleStripProps) {
  const { t } = useTranslation()
  const language = currentLanguage()
  const listRef = useRef<HTMLOListElement>(null)
  const todayRef = useRef<HTMLLIElement>(null)

  const days = Array.from({ length: diffInDays(cycle.end, cycle.start) + 1 }, (_, index) => addDays(cycle.start, index))
  const spent = new Map<IsoDate, number>()
  for (const row of transactions) {
    if (row.type !== 'expense') continue
    const date = zonedParts(row.occurred_at, timezone).date
    spent.set(date, (spent.get(date) ?? 0) + row.amount)
  }
  const heaviest = Math.max(0, ...spent.values())
  const nextPayday = addDays(cycle.end, 1)

  useLayoutEffect(() => {
    const list = listRef.current
    const cell = todayRef.current
    if (!list || !cell) return
    // Centre today, then round to a cell edge so the first visible day is never cut in half.
    const ideal = cell.offsetLeft - list.clientWidth / 2 + cell.clientWidth / 2
    const pad = parseFloat(getComputedStyle(list).paddingLeft) || 0
    const items = [...list.children] as HTMLElement[]
    const first = items.reduce((best, item) => (Math.abs(item.offsetLeft - pad - ideal) < Math.abs(best.offsetLeft - pad - ideal) ? item : best), items[0])
    list.scrollLeft = first.offsetLeft - pad
  }, [today, cycle.start])

  return (
    <ol
      ref={listRef}
      aria-label={t('dashboard.stripLabel')}
      className={cn(
        'relative flex snap-x scroll-px-3 gap-1 overflow-x-auto overscroll-x-contain sm:scroll-px-4 [scrollbar-width:none] xl:gap-0.5 [&::-webkit-scrollbar]:hidden',
        // Below xl the row scrolls; the edges fade so the hidden days read as more to scroll to.
        '[mask-image:linear-gradient(to_right,transparent,black_20px,black_calc(100%-20px),transparent)] xl:[mask-image:none]',
        className,
      )}
    >
      {days.map((date) => {
        const local = isoDateToLocalDate(date)
        const isToday = date === today
        const isPayday = date === cycle.start
        const isFuture = date > today
        const amount = spent.get(date) ?? 0
        // Square-root ramp: one big payday bill would otherwise flatten every ordinary day to a stub.
        const bar = heaviest > 0 && amount > 0 ? Math.max(3, Math.round(Math.sqrt(amount / heaviest) * BAR_MAX)) : 0
        const due = dueDates.has(date)
        const label = [formatDate(date, language), isPayday && t('dashboard.payday'), due && t('dashboard.safePayDue')]
          .filter(Boolean)
          .join(' · ')

        const body = (
          <>
            <span className={cn('text-[10px] leading-none font-semibold', isToday ? 'text-primary-foreground/80' : 'text-muted-foreground')}>
              {format(local, 'EEE', { locale: dateLocale(language) })}
            </span>
            <span
              className={cn(
                'num mt-1.5 inline-flex size-7 items-center justify-center rounded-full text-[13px] font-bold xl:size-6',
                isPayday && !isToday && 'ring-2 ring-brand ring-inset',
                isFuture && 'font-semibold text-muted-foreground',
              )}
            >
              {local.getDate()}
            </span>
            <span className="mt-1 flex h-1.5 items-center" aria-hidden="true">
              {due && <span className="size-1.5 rounded-full bg-gold" />}
            </span>
            <span className="flex h-[18px] items-end" aria-hidden="true">
              {bar > 0 && (
                <span
                  className={cn('w-3.5 rounded-t-[3px]', isToday ? 'bg-primary-foreground/60' : 'bg-expense/60')}
                  style={{ height: bar }}
                />
              )}
            </span>
          </>
        )

        const cellClass = cn(
          'flex w-10 flex-col items-center rounded-xl pt-2 pb-1.5 outline-none focus-visible:ring-3 focus-visible:ring-ring/50 xl:w-full',
          isToday ? 'today-settle bg-primary text-primary-foreground' : 'text-foreground',
        )

        return (
          <li key={date} ref={isToday ? todayRef : undefined} className="shrink-0 snap-start xl:min-w-0 xl:flex-1">
            {isFuture || !linkDays ? (
              <div className={cellClass} aria-label={label} aria-current={isToday ? 'date' : undefined} role="img">
                {body}
              </div>
            ) : (
              <Link
                to={`/transactions?date=${date}`}
                aria-label={t('dashboard.stripDay', { date: label })}
                aria-current={isToday ? 'date' : undefined}
                className={cn(cellClass, !isToday && 'transition-colors hover:bg-muted')}
              >
                {body}
              </Link>
            )}
          </li>
        )
      })}
      {/* The next payday closes the row, so "N days to payday" reads as distance, not only as text. */}
      <li className="shrink-0 snap-start xl:min-w-0 xl:flex-1">
        <div
          role="img"
          aria-label={`${formatDate(nextPayday, language)} · ${t('dashboard.nextPayday')}`}
          className="flex w-10 flex-col items-center pt-2 pb-1.5 text-brand-ink xl:w-full dark:text-brand"
        >
          <span className="text-[10px] leading-none font-bold">{t('dashboard.payday')}</span>
          <span className="num mt-1.5 inline-flex size-7 items-center justify-center rounded-full border-2 border-dashed border-brand text-[13px] font-bold xl:size-6">
            {isoDateToLocalDate(nextPayday).getDate()}
          </span>
        </div>
      </li>
    </ol>
  )
}
