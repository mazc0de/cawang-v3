import {
  ArrowLeftRight,
  CalendarDays,
  ChartPie,
  Minus,
  PiggyBank,
  Plus,
  Repeat,
  RotateCcw,
  ShieldCheck,
  Smartphone,
  TableProperties,
  type LucideIcon,
} from 'lucide-react'
import { type CSSProperties, type ReactNode, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'
import { AmountPresets } from '@/components/amount-presets'
import { BrandMark, Wordmark } from '@/components/brand-mark'
import { LanguageSwitch } from '@/components/header/language-switch'
import { ThemeToggle } from '@/components/header/theme-toggle'
import { Money } from '@/components/money'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { CategoryTile } from '@/features/categories/category-tile'
import { CycleStrip } from '@/features/cycle/cycle-strip'
import { currentLanguage } from '@/i18n'
import { DEFAULT_AMOUNT_PRESETS } from '@/lib/amount-presets'
import { type Cycle, cycleContaining, daysUntilNextCycle } from '@/lib/cycle'
import type { Transaction } from '@/lib/database'
import { addDays, diffInDays, type IsoDate, todayIn, zonedTimestamp } from '@/lib/dates'
import { formatCycleRange } from '@/lib/format'
import { cn } from '@/lib/utils'
import { APP_VERSION_LABEL } from '@/lib/version'
import { AlwaysShowAmounts } from '@/providers/amount-visibility'
import { useAuth } from '@/providers/auth-provider'

// Sample money for the page's live examples. Labelled as made up wherever it shows.
const SAMPLE_TOTAL = 4_780_000
const SAMPLE_RENT = 650_000
const QUICK_SPENDS = [
  { key: 'lunch', amount: 25_000 },
  { key: 'ride', amount: 19_000 },
  { key: 'coffee', amount: 18_000 },
] as const
const SAMPLE_DAILY = [35_000, 62_000, 18_000, 120_000, 45_000, 27_000, 80_000, 54_000]

const browserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone
const COPYRIGHT_YEAR = new Date().getFullYear()

/** Sign-up and sign-in, or the way back in for someone already signed in. */
function Actions({ className }: { className?: string }) {
  const { t } = useTranslation()
  const { session } = useAuth()
  if (session) {
    return (
      <div className={className}>
        <Button asChild size="lg" className="h-12 px-6 text-base">
          <Link to="/dashboard">{t('landing.openDashboard')}</Link>
        </Button>
      </div>
    )
  }
  return (
    <div className={cn('flex flex-wrap items-center gap-3', className)}>
      <Button asChild size="lg" className="h-12 px-6 text-base">
        <Link to="/register">{t('landing.register')}</Link>
      </Button>
      <Button asChild size="lg" variant="outline" className="h-12 px-6 text-base">
        <Link to="/login">{t('landing.login')}</Link>
      </Button>
    </div>
  )
}

function Header() {
  const { t } = useTranslation()
  const { session } = useAuth()
  return (
    <header className="mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-2 px-4 sm:h-20 sm:px-8">
      <Link to="/" className="shrink-0 rounded-lg">
        <Wordmark />
      </Link>
      <nav aria-label={t('nav.mainMenu')} className="flex items-center gap-0.5 sm:gap-1">
        <a href="#fitur" className="hidden rounded-lg px-3 py-2 text-sm font-semibold hover:bg-muted md:inline-block">
          {t('landing.nav.features')}
        </a>
        <LanguageSwitch />
        <ThemeToggle />
        {session ? (
          <Button asChild size="sm" className="ml-1">
            <Link to="/dashboard">{t('landing.openDashboard')}</Link>
          </Button>
        ) : (
          <>
            <Link to="/login" className="hidden rounded-lg px-3 py-2 text-sm font-semibold hover:bg-muted sm:inline-block">
              {t('landing.login')}
            </Link>
            <Button asChild size="sm" className="ml-1">
              <Link to="/register">
                <span className="sm:hidden">{t('landing.registerShort')}</span>
                <span className="hidden sm:inline">{t('landing.register')}</span>
              </Link>
            </Button>
          </>
        )}
      </nav>
    </header>
  )
}

/** One of the logo's coins, holding a live balance. Sizes use container units so it scales with the branch. */
function Coin({
  label,
  amount,
  empty = false,
  className,
  style,
  amountClassName,
  live = false,
  children,
}: {
  label: string
  amount: number
  empty?: boolean
  className?: string
  style?: CSSProperties
  amountClassName?: string
  /** Announce changes to screen readers (only the balance the examples move). */
  live?: boolean
  children?: ReactNode
}) {
  return (
    <div
      className={cn(
        'coin-settle absolute flex aspect-square flex-col items-center justify-center rounded-full text-center transition-[background-color,box-shadow] duration-300',
        empty
          ? 'border-[0.5cqi] border-dashed border-gold bg-transparent text-foreground'
          : 'bg-gold text-[#4d3800] shadow-[0_18px_40px_-18px_rgb(120_90_0/0.6)]',
        className,
      )}
      style={style}
    >
      {!empty && <span aria-hidden="true" className="absolute inset-[7%] rounded-full border-[0.9cqi] border-white/55" />}
      <span className="relative text-[max(11px,2.3cqi)] leading-tight font-bold">{label}</span>
      <span aria-live={live ? 'polite' : undefined} className="relative">
        <Money amount={amount} className={cn('mt-[0.4cqi] font-extrabold tracking-tight', amountClassName)} />
      </span>
      {children}
    </div>
  )
}

function Hero() {
  const { t } = useTranslation()
  const [locked, setLocked] = useState(true)
  const [spends, setSpends] = useState<number[]>([])
  const today = todayIn(browserTimezone)
  const daysLeft = daysUntilNextCycle(today, 25)
  const total = SAMPLE_TOTAL - spends.reduce((sum, amount) => sum + amount, 0)
  const lockedAmount = locked ? SAMPLE_RENT : 0

  return (
    <section
      aria-labelledby="hero-title"
      className="mx-auto grid max-w-[1280px] grid-cols-1 gap-4 px-4 pt-2 sm:gap-8 sm:px-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:grid-rows-[1fr_auto] lg:gap-y-0 lg:pt-6"
    >
      {/* Phones read: promise, action, the coins, then the chips that move them. Desktop keeps copy left, branch right. */}
      <div className="max-w-[560px] lg:col-start-1 lg:row-start-1 lg:self-end">
        <h1 id="hero-title" className="text-[clamp(36px,5.6vw,4.5rem)] leading-[1.02] font-extrabold tracking-[-0.035em] text-balance">
          {t('landing.hero.title')}
        </h1>
        <p className="mt-4 max-w-[48ch] text-[17px] leading-relaxed text-muted-foreground sm:mt-5 sm:text-lg">{t('landing.hero.lead')}</p>
        <Actions className="mt-6 sm:mt-7" />
      </div>
      <div className="max-w-[560px] lg:col-start-1 lg:row-start-2 lg:pt-10 lg:pb-14">
        <div>
          <p className="mb-3 text-xs text-muted-foreground">{t('landing.hero.sampleNote')}</p>
          <p className="text-sm font-semibold">{t('landing.hero.tryLabel')}</p>
          <div className="mt-2.5 flex flex-wrap items-center gap-1.5 sm:gap-2">
            {QUICK_SPENDS.map((spend) => (
              <button
                key={spend.key}
                type="button"
                onClick={() => setSpends((list) => [...list, spend.amount])}
                className="inline-flex h-9 touch-manipulation items-center gap-1.5 rounded-full border bg-card px-3 text-[13px] font-semibold transition-colors sm:h-10 sm:gap-2 sm:px-4 sm:text-sm outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 active:scale-95"
              >
                {t(`landing.hero.${spend.key}`)}
                <Money amount={spend.amount} tone="expense" signed className="text-[12px] sm:text-[13px]" />
              </button>
            ))}
            {spends.length > 0 && (
              <Button variant="ghost" size="icon" aria-label={t('landing.hero.reset')} onClick={() => setSpends([])}>
                <RotateCcw />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* The logo, drawn at the scale of the page: a branch growing the three balances, rooted on the next section's rule. */}
      <div className="relative row-start-2 mx-auto aspect-[100/88] w-[88%] max-w-[560px] self-end sm:w-[80%] lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mx-0 lg:aspect-square lg:w-[min(760px,calc(100%+max(0px,(100vw-1280px)/2)+2rem))] lg:max-w-none">
        <div className="@container absolute inset-x-0 top-0 aspect-square">
        <svg viewBox="0 0 100 100" aria-hidden="true" className="absolute inset-0 size-full" style={{ stroke: 'var(--logo-stem, #2f6b2f)' }}>
          <g fill="none" strokeLinecap="round">
            {/* Desktop: the trunk runs to the hero's bottom rule. Phones: it ends on a round cap like the mark's strokes. */}
            <path className="branch-path hidden lg:block" pathLength={1} d="M50 100V40" strokeWidth="7" />
            <path className="branch-path lg:hidden" pathLength={1} d="M50 86V40" strokeWidth="7" />
            <path className="branch-path" pathLength={1} d="M50 84C50 70 38 62 25 58" strokeWidth="6" style={{ animationDelay: '250ms' }} />
            <path
              className="branch-path transition-[stroke-opacity] duration-500"
              pathLength={1}
              d="M50 73C50 61 62 53 76 50"
              strokeWidth="6"
              strokeOpacity={locked ? 1 : 0.3}
              style={{ animationDelay: '350ms' }}
            />
          </g>
        </svg>
        <Coin
          label={t('landing.hero.available')}
          amount={total - lockedAmount}
          className="top-0 left-[24%] w-[52%] lg:top-[6%] lg:left-[30%] lg:w-[40%]"
          amountClassName="text-[max(22px,5cqi)]"
          live
          style={{ '--settle-delay': '850ms' } as CSSProperties}
        >
          <span className="relative mt-[0.6cqi] text-[max(11px,2.1cqi)] font-semibold">{t('dashboard.paydayIn', { count: daysLeft })}</span>
        </Coin>
        <Coin
          label={t('landing.hero.total')}
          amount={total}
          className="top-[48%] left-0 w-[36%] lg:top-[41%] lg:left-[4%] lg:w-[30%]"
          amountClassName="text-[max(15px,3.9cqi)]"
          style={{ '--settle-delay': '600ms' } as CSSProperties}
        >
          <span className="relative mt-[0.4cqi] hidden text-[max(11px,1.9cqi)] font-semibold @md:block">{t('landing.hero.accounts')}</span>
        </Coin>
        <Coin
          label={t('landing.hero.locked')}
          amount={lockedAmount}
          empty={!locked}
          className="top-[44%] left-[62%] w-[37%] lg:top-[33%] lg:left-[63%] lg:w-[33%]"
          amountClassName="text-[max(15px,3.9cqi)]"
          style={{ '--settle-delay': '700ms' } as CSSProperties}
        >
          <span className="relative mt-[0.4cqi] hidden text-[max(11px,1.9cqi)] font-semibold @md:block">
            {locked ? t('landing.hero.rent') : t('landing.hero.nothingLocked')}
          </span>
          <Switch
            checked={locked}
            onCheckedChange={setLocked}
            aria-label={t('landing.hero.lockRent')}
            className="relative mt-[1cqi] data-checked:bg-shell data-unchecked:bg-black/25 dark:data-unchecked:bg-white/30"
          />
        </Coin>
        </div>
      </div>
    </section>
  )
}

/** A Cycle of made-up spending: one expense a day up to today, so the strip has something to draw. */
function sampleTransactions(cycle: Cycle, today: IsoDate): Transaction[] {
  const days = Math.min(diffInDays(today, cycle.start), diffInDays(cycle.end, cycle.start)) + 1
  return Array.from({ length: days }, (_, index) => {
    const date = addDays(cycle.start, index)
    return {
      id: date,
      user_id: '',
      type: 'expense',
      amount: SAMPLE_DAILY[(index * 5) % SAMPLE_DAILY.length],
      occurred_at: zonedTimestamp(date, '12:00', browserTimezone),
      account_id: '',
      to_account_id: null,
      category_id: null,
      note: null,
      parent_transaction_id: null,
      created_at: '',
      updated_at: '',
    }
  })
}

function SectionHeading({ id, title, body }: { id: string; title: string; body: string }) {
  return (
    <div className="max-w-[560px]">
      <h2 id={id} className="text-[clamp(30px,3.6vw,3rem)] leading-[1.06] font-extrabold tracking-[-0.03em] text-balance">
        {title}
      </h2>
      <p className="mt-4 text-[17px] leading-relaxed text-muted-foreground">{body}</p>
    </div>
  )
}

function CycleSection() {
  const { t } = useTranslation()
  const language = currentLanguage()
  const [payday, setPayday] = useState(25)
  const today = todayIn(browserTimezone)
  const cycle = cycleContaining(today, payday)
  const transactions = useMemo(() => sampleTransactions(cycle, today), [cycle.start, cycle.end, today]) // eslint-disable-line react-hooks/exhaustive-deps
  const due = addDays(today, 3) <= cycle.end ? addDays(today, 3) : cycle.end
  const step = (delta: number) => setPayday((day) => ((day - 1 + delta + 31) % 31) + 1)

  return (
    <section id="fitur" aria-labelledby="cycle-title" className="scroll-mt-4 border-t">
      <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-8 lg:py-24">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading id="cycle-title" title={t('landing.cycle.title')} body={t('landing.cycle.body')} />
        <div className="flex items-center gap-4 self-start rounded-(--radius-card) border bg-card px-4 py-3 lg:self-auto">
          <span className="text-sm font-semibold text-muted-foreground">{t('landing.cycle.payday')}</span>
          <Button variant="secondary" size="icon" aria-label={t('landing.cycle.earlier')} onClick={() => step(-1)}>
            <Minus />
          </Button>
          <output aria-live="polite" className="num w-9 text-center text-[28px] leading-none font-extrabold">
            {payday}
          </output>
          <Button variant="secondary" size="icon" aria-label={t('landing.cycle.later')} onClick={() => step(1)}>
            <Plus />
          </Button>
        </div>
      </div>
      <div className="mt-10 overflow-hidden rounded-(--radius-card) border bg-card">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 px-4 pt-4 sm:px-5">
          <p className="num text-base font-bold">Cycle {formatCycleRange(cycle, language)}</p>
          <p className="text-sm font-semibold text-brand-ink dark:text-brand">{t('dashboard.paydayIn', { count: daysUntilNextCycle(today, payday) })}</p>
        </div>
        <CycleStrip
          cycle={cycle}
          today={today}
          transactions={transactions}
          timezone={browserTimezone}
          dueDates={new Set([due])}
          linkDays={false}
          className="mt-3 px-3 pb-2 sm:px-4"
        />
        <div className="flex flex-wrap gap-x-6 gap-y-2 border-t px-4 py-3 text-[13px] text-muted-foreground sm:px-5">
          <span className="inline-flex items-center gap-2">
            <span aria-hidden="true" className="h-3 w-2.5 rounded-t-[3px] bg-expense/60" />
            {t('landing.cycle.legendSpend')}
          </span>
          <span className="inline-flex items-center gap-2">
            <span aria-hidden="true" className="size-2 rounded-full bg-gold" />
            {t('landing.cycle.legendDue')}
          </span>
          <span className="sm:ml-auto">{t('landing.hero.sampleNote')}</span>
        </div>
      </div>
      </div>
    </section>
  )
}

const LOG_CATEGORIES = [
  { key: 'food', icon: 'utensils', color: 'orange' },
  { key: 'transport', icon: 'bus', color: 'sky' },
  { key: 'groceries', icon: 'shopping-basket', color: 'teal' },
] as const
type LogCategory = (typeof LOG_CATEGORIES)[number]

function LogSection() {
  const { t } = useTranslation()
  const [amount, setAmount] = useState<number | null>(null)
  const [category, setCategory] = useState<LogCategory | null>(null)
  const [saved, setSaved] = useState<Array<{ id: number; amount: number; category: LogCategory }>>([])

  const save = () => {
    if (!amount || !category) return
    setSaved((list) => [{ id: Date.now(), amount, category }, ...list].slice(0, 3))
    setAmount(null)
    setCategory(null)
  }

  return (
    <section aria-labelledby="log-title" className="border-y bg-raised">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-10 px-4 py-16 sm:px-8 lg:grid-cols-2 lg:py-24">
        <SectionHeading id="log-title" title={t('landing.log.title')} body={t('landing.log.body')} />
        <div className="w-full max-w-[520px] justify-self-center rounded-(--radius-card) border bg-card p-4 sm:p-6 lg:justify-self-end">
          <p className="text-sm font-semibold text-muted-foreground">{t('landing.log.amount')}</p>
          <Money amount={amount ?? 0} tone={amount ? 'expense' : 'muted'} className="mt-1 block text-[36px] leading-tight font-extrabold tracking-tight" />
          <AmountPresets presets={DEFAULT_AMOUNT_PRESETS} amount={amount} onChange={setAmount} wrap className="mt-3" />
          <p className="mt-5 text-sm font-semibold text-muted-foreground">{t('landing.log.category')}</p>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {LOG_CATEGORIES.map((item) => (
              <button
                key={item.key}
                type="button"
                aria-pressed={category?.key === item.key}
                onClick={() => setCategory(item)}
                className="flex touch-manipulation flex-col items-center gap-1.5 rounded-xl border bg-card px-2 py-3 text-sm font-semibold transition-colors outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 aria-pressed:border-primary aria-pressed:bg-brand-soft"
              >
                <CategoryTile icon={item.icon} color={item.color} className="size-9" />
                {t(`landing.log.${item.key}`)}
              </button>
            ))}
          </div>
          <Button className="mt-5 h-11 w-full text-base" disabled={!amount || !category} onClick={save}>
            {t('landing.log.save')}
          </Button>
          <div className="mt-5 border-t pt-4">
            <p className="text-sm font-semibold">{t('landing.log.saved')}</p>
            {saved.length === 0 ? (
              <p className="mt-2 text-sm text-muted-foreground">{t('landing.log.empty')}</p>
            ) : (
              <ul className="mt-1">
                {saved.map((row) => (
                  <li key={row.id} className="flex items-center gap-3 py-2">
                    <CategoryTile icon={row.category.icon} color={row.category.color} className="size-8" />
                    <span className="flex-1 text-sm font-semibold">{t(`landing.log.${row.category.key}`)}</span>
                    <Money amount={row.amount} tone="expense" signed className="text-sm font-bold" />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

const FEATURES: Array<{ key: 'safePay' | 'budget' | 'recurring' | 'calendar' | 'reports' | 'bulk' | 'accounts' | 'app'; icon: LucideIcon }> = [
  { key: 'safePay', icon: ShieldCheck },
  { key: 'budget', icon: PiggyBank },
  { key: 'recurring', icon: Repeat },
  { key: 'calendar', icon: CalendarDays },
  { key: 'reports', icon: ChartPie },
  { key: 'bulk', icon: TableProperties },
  { key: 'accounts', icon: ArrowLeftRight },
  { key: 'app', icon: Smartphone },
]

function FeatureList() {
  const { t } = useTranslation()
  return (
    <section aria-labelledby="features-title" className="mx-auto max-w-[1280px] px-4 py-16 sm:px-8 lg:py-24">
      <h2 id="features-title" className="text-[clamp(26px,2.8vw,2.25rem)] leading-tight font-extrabold tracking-[-0.025em] text-balance">
        {t('landing.features.title')}
      </h2>
      <dl className="mt-8 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((feature) => (
          <div key={feature.key} className="border-t py-5">
            <dt className="flex items-center gap-2.5 text-base font-bold">
              <feature.icon className="size-5 text-brand" strokeWidth={1.9} aria-hidden="true" />
              {t(`landing.features.${feature.key}.name`)}
            </dt>
            <dd className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{t(`landing.features.${feature.key}.body`)}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

function Closing() {
  const { t } = useTranslation()
  const { session } = useAuth()
  const onShell = 'h-12 bg-white px-6 text-base text-shell hover:bg-white/90'
  return (
    <section aria-labelledby="cta-title" className="shell">
      <div className="mx-auto flex max-w-[1280px] flex-col items-start gap-8 px-4 py-16 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:py-20">
        <div className="flex items-center gap-5">
          <BrandMark className="size-16 shrink-0 sm:size-20" />
          <div>
            <h2 id="cta-title" className="text-[clamp(30px,3.6vw,3rem)] leading-[1.06] font-extrabold tracking-[-0.03em] text-balance">
              {t('landing.cta.title')}
            </h2>
            <p className="mt-2 max-w-[52ch] text-[17px] text-muted-foreground">{t('landing.cta.body')}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          {session ? (
            <Button asChild size="lg" className={onShell}>
              <Link to="/dashboard">{t('landing.openDashboard')}</Link>
            </Button>
          ) : (
            <>
              <Button asChild size="lg" className={onShell}>
                <Link to="/register">{t('landing.register')}</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 border-white/40 bg-transparent px-6 text-base text-foreground hover:bg-white/10 hover:text-foreground dark:bg-transparent"
              >
                <Link to="/login">{t('landing.login')}</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  const { t } = useTranslation()
  return (
    <footer className="mx-auto flex max-w-[1280px] flex-col gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8">
      <p>{t('landing.footer.legal', { year: COPYRIGHT_YEAR, version: APP_VERSION_LABEL })}</p>
      <div className="-ml-2 flex items-center sm:ml-0" role="group" aria-label={t('landing.footer.display')}>
        <LanguageSwitch />
        <ThemeToggle />
      </div>
    </footer>
  )
}

export function LandingPage() {
  return (
    <AlwaysShowAmounts>
      <Header />
      <main className="overflow-x-clip">
        <Hero />
        <CycleSection />
        <LogSection />
        <FeatureList />
        <Closing />
      </main>
      <Footer />
    </AlwaysShowAmounts>
  )
}
