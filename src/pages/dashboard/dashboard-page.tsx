import { Lock, Plus } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'
import { AmountToggle } from '@/components/amount-toggle'
import { Money } from '@/components/money'
import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useAccountBalances, useActiveAccounts } from '@/features/accounts/queries'
import { CycleSummary } from '@/features/budgets/cycle-summary'
import { useBudgetProgress } from '@/features/budgets/queries'
import { BudgetStatusPill } from '@/features/budgets/status-pill'
import { CategoryTile } from '@/features/categories/category-tile'
import { CycleStrip } from '@/features/cycle/cycle-strip'
import { useCurrentCycle, useCycleTransactions } from '@/features/cycle/use-cycle'
import { PendingOccurrenceList } from '@/features/recurring/pending-list'
import { usePendingOccurrences } from '@/features/recurring/queries'
import { useSafePays } from '@/features/safe-pay/queries'
import { useLookups } from '@/features/transactions/lookups'
import { TransactionRow } from '@/features/transactions/transaction-row'
import { currentLanguage } from '@/i18n'
import { daysUntilNextCycle } from '@/lib/cycle'
import type { Transaction } from '@/lib/database'
import { diffInDays, zonedParts } from '@/lib/dates'
import { formatCycleRange } from '@/lib/format'

const TODAY_ROWS = 5
const SIDE_ROWS = 4

function totalsOf(rows: Transaction[]) {
  return rows.reduce(
    (sum, row) => (row.type === 'transfer' ? sum : { ...sum, [row.type]: sum[row.type] + row.amount }),
    { income: 0, expense: 0 },
  )
}

function Figure({ label, amount, tone }: { label: string; amount: number; tone?: 'income' | 'expense' }) {
  return (
    <div className="min-w-0">
      <p className="text-[13px] text-muted-foreground">{label}</p>
      <Money amount={amount} tone={amount === 0 ? 'muted' : tone} className="mt-0.5 block text-[17px] font-bold" />
    </div>
  )
}

function CardHeader({ id, title, to, linkLabel }: { id: string; title: string; to: string; linkLabel: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3 px-4 pt-4 sm:px-5">
      <h2 id={id} className="text-base font-bold">
        {title}
      </h2>
      <Link to={to} className="text-sm font-semibold text-brand-ink hover:underline dark:text-brand">
        {linkLabel}
      </Link>
    </div>
  )
}

export function DashboardPage() {
  const { t } = useTranslation()
  const language = currentLanguage()
  const { today, cycle, timezone, startDay } = useCurrentCycle()
  const lookups = useLookups()
  const accounts = useActiveAccounts()
  const { data: balances } = useAccountBalances()
  const cycleTransactions = useCycleTransactions(cycle, timezone)
  const budgets = useBudgetProgress(cycle, timezone)
  const pending = usePendingOccurrences(today)
  const safePays = useSafePays()

  const balance = (accounts.data ?? []).reduce(
    (sum, account) => {
      const row = balances?.get(account.id)
      return {
        total: sum.total + (row?.balance ?? account.initial_balance),
        locked: sum.locked + (row?.locked_funds ?? 0),
      }
    },
    { total: 0, locked: 0 },
  )

  const cycleRows = cycleTransactions.data ?? []
  const todayRows = cycleRows.filter((row) => zonedParts(row.occurred_at, timezone).date === today).reverse()
  const todayTotals = totalsOf(todayRows)
  const cycleTotals = totalsOf(cycleRows)
  const daysLeft = daysUntilNextCycle(today, startDay)
  const cycleLength = diffInDays(cycle.end, cycle.start) + 1
  const dayNumber = diffInDays(today, cycle.start) + 1
  const atRisk = (budgets.data ?? []).filter((row) => row.status !== 'safe')
  const waiting = pending.data ?? []
  const dueDates = new Set(
    (safePays.data ?? [])
      .filter((item) => item.status === 'pending' && item.due_date && item.due_date >= cycle.start && item.due_date <= cycle.end)
      .map((item) => item.due_date!),
  )

  return (
    <>
      <PageHeader
        className="hidden lg:flex"
        title={t('nav.dashboard')}
        actions={
          <Button asChild>
            <Link to="/transactions?new=1">
              <Plus />
              {t('nav.addTransaction')}
            </Link>
          </Button>
        }
      />
      <h1 className="sr-only lg:hidden">{t('nav.dashboard')}</h1>

      {/* The green band continues the mobile top bar; on desktop it is the first card. */}
      <section
        className="shell -mx-4 -mt-4 rounded-b-[28px] px-5 pt-2 pb-5 sm:-mx-6 sm:px-7 lg:mx-0 lg:mt-6 lg:flex lg:items-end lg:justify-between lg:gap-10 lg:rounded-(--radius-card) lg:px-7 lg:py-6"
        aria-label={t('money.availableBalance')}
      >
        <div className="min-w-0">
          <div className="-my-1.5 flex items-center gap-1">
            <p className="text-sm font-medium text-muted-foreground">{t('money.availableBalance')}</p>
            <AmountToggle privacyKey="summary" name={t('money.availableBalance')} />
          </div>
          {accounts.isPending ? (
            <Skeleton className="mt-2 h-11 w-56" />
          ) : (
            <Money
              amount={balance.total - balance.locked}
              privacyKey="summary"
              className="mt-1 block text-[38px] leading-[44px] font-extrabold tracking-tight lg:text-[44px] lg:leading-[52px]"
            />
          )}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2.5 lg:mt-0 lg:w-[420px] lg:shrink-0">
          <div className="rounded-2xl bg-shell-raised px-3.5 py-2.5">
            <p className="text-xs font-medium text-muted-foreground">{t('money.totalBalance')}</p>
            <Money amount={balance.total} privacyKey="summary" className="mt-0.5 block text-base font-bold" />
            <p className="mt-0.5 text-[11px] text-muted-foreground">{t('dashboard.accountsCount', { count: accounts.data?.length ?? 0 })}</p>
          </div>
          <Link to="/safe-pay" className="rounded-2xl bg-shell-raised px-3.5 py-2.5 transition-colors hover:bg-white/10 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none">
            <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <Lock className="size-3" />
              {t('money.lockedFunds')}
            </p>
            <Money
              amount={balance.locked}
              privacyKey="summary"
              tone={balance.locked ? 'locked' : 'muted'}
              className="mt-0.5 block text-base font-bold"
            />
          </Link>
        </div>
      </section>

      <section className="mt-4 overflow-hidden rounded-(--radius-card) border bg-card lg:mt-6" aria-labelledby="this-cycle">
        <div className="px-4 pt-4 sm:px-5">
          <div className="flex items-baseline justify-between gap-3">
            <h2 id="this-cycle" className="text-base font-bold">
              {t('dashboard.thisCycle')}
            </h2>
            <span className="num text-sm text-muted-foreground">{formatCycleRange(cycle, language)}</span>
          </div>
          <p className="mt-0.5 text-[13px] text-muted-foreground">
            {t('dashboard.dayOfCycle', { day: dayNumber, total: cycleLength })} ·{' '}
            <span className="font-semibold text-brand-ink dark:text-brand">{t('dashboard.paydayIn', { count: daysLeft })}</span>
          </p>
        </div>
        {cycleTransactions.isPending ? (
          <Skeleton className="mx-4 mt-3 mb-2 h-[86px] rounded-xl sm:mx-5" />
        ) : (
          <CycleStrip
            cycle={cycle}
            today={today}
            transactions={cycleRows}
            timezone={timezone}
            dueDates={dueDates}
            className="mt-3 px-3 pb-2 sm:px-4"
          />
        )}
        {/* Phones get two columns and Selisih on its own row: an 8-digit salary must never collide. */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-3 border-t px-4 py-3.5 sm:grid-cols-3 sm:px-5">
          <Figure label={t('transactionTypes.income')} amount={cycleTotals.income} tone="income" />
          <Figure label={t('transactionTypes.expense')} amount={cycleTotals.expense} tone="expense" />
          <div className="col-span-2 min-w-0 sm:col-span-1">
            <p className="text-[13px] text-muted-foreground">{t('dashboard.net')}</p>
            <Money amount={cycleTotals.income - cycleTotals.expense} className="mt-0.5 block text-[17px] font-bold" />
          </div>
        </div>
      </section>

      <div className="mt-4 grid items-start gap-4 lg:mt-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-6">
        <section className="overflow-hidden rounded-(--radius-card) border bg-card" aria-labelledby="today">
          <CardHeader
            id="today"
            title={t('dashboard.today')}
            to="/transactions"
            linkLabel={todayRows.length > TODAY_ROWS ? t('dashboard.viewAllCount', { count: todayRows.length }) : t('dashboard.openTransactions')}
          />
          <div className="mt-2 grid grid-cols-2 gap-4 px-4 sm:px-5">
            <Figure label={t('transactionTypes.income')} amount={todayTotals.income} tone="income" />
            <Figure label={t('transactionTypes.expense')} amount={todayTotals.expense} tone="expense" />
          </div>
          {cycleTransactions.isPending ? (
            <div className="flex flex-col gap-2 p-5">
              <Skeleton className="h-12 rounded-xl" />
              <Skeleton className="h-12 rounded-xl" />
            </div>
          ) : todayRows.length === 0 ? (
            <div className="mt-3 flex flex-col items-start gap-3 border-t px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
              <p className="text-sm text-muted-foreground">{t('dashboard.nothingToday')}</p>
              <Button size="sm" asChild className="lg:hidden">
                <Link to="/transactions?new=1">
                  <Plus />
                  {t('nav.addTransaction')}
                </Link>
              </Button>
            </div>
          ) : (
            <ul className="mt-2 pb-2">
              {todayRows.slice(0, TODAY_ROWS).map((row) => (
                <TransactionRow key={row.id} transaction={row} lookups={lookups} timezone={timezone} />
              ))}
            </ul>
          )}
        </section>

        <div className="flex flex-col gap-4 lg:gap-6">
          <section className="overflow-hidden rounded-(--radius-card) border bg-card" aria-labelledby="budget-overview">
            <CardHeader id="budget-overview" title={t('nav.budgets')} to="/budgets" linkLabel={t('dashboard.manageBudgets')} />
            {budgets.isPending ? (
              <div className="p-5">
                <Skeleton className="h-24 rounded-xl" />
              </div>
            ) : (budgets.data ?? []).length === 0 ? (
              <p className="px-4 pt-2 pb-4 text-sm text-muted-foreground sm:px-5">{t('dashboard.noBudgets')}</p>
            ) : (
              <>
                <div className="px-4 pt-3 sm:px-5">
                  <CycleSummary rows={budgets.data!} compact />
                </div>
                {atRisk.length === 0 ? (
                  <p className="px-4 py-4 text-sm text-muted-foreground sm:px-5">{t('dashboard.allBudgetsSafe')}</p>
                ) : (
                  <ul className="mt-3 border-t pb-2">
                    {atRisk.slice(0, SIDE_ROWS).map((row) => {
                      const left = row.budget.amount - row.spent
                      return (
                        <li key={row.budget.id} className="flex items-center gap-3 px-4 py-2.5 sm:px-5">
                          <CategoryTile icon={row.category?.icon ?? 'tag'} color={row.category?.color ?? 'slate'} className="size-8" />
                          <span className="min-w-0 flex-1 truncate text-sm font-semibold">{row.category?.name}</span>
                          <BudgetStatusPill status={row.status} />
                          <span className="w-28 text-right text-sm">
                            {left < 0 ? (
                              <Money amount={-left} tone="expense" signed />
                            ) : (
                              <>
                                <span className="text-muted-foreground">{t('budgets.leftShort')} </span>
                                <Money amount={left} />
                              </>
                            )}
                          </span>
                        </li>
                      )
                    })}
                  </ul>
                )}
              </>
            )}
          </section>

          <section className="overflow-hidden rounded-(--radius-card) border bg-card" aria-labelledby="recurring-overview">
            <CardHeader
              id="recurring-overview"
              title={t('recurring.waitingHeading', { count: waiting.length })}
              to="/recurring"
              linkLabel={waiting.length > SIDE_ROWS ? t('dashboard.viewAllCount', { count: waiting.length }) : t('dashboard.openRecurring')}
            />
            {pending.isPending ? (
              <div className="p-5">
                <Skeleton className="h-24 rounded-xl" />
              </div>
            ) : waiting.length === 0 ? (
              <p className="px-4 pt-2 pb-4 text-sm text-muted-foreground sm:px-5">{t('recurring.nothingWaiting')}</p>
            ) : (
              <div className="mt-2 pb-2">
                <PendingOccurrenceList occurrences={waiting.slice(0, SIDE_ROWS)} />
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  )
}
