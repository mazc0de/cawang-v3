# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Young Indonesians managing their own money, publicly signing up. They are paid on a fixed payday
(often not the 1st) and think about money "until the next payday", not by calendar month. Typical
moments: logging a purchase right after paying (often on a phone, standing up), checking what is
actually free to spend before a purchase, and reviewing the Cycle on payday.

## Product Purpose

Cawang (Catat Keuangan) records money moving in, out and between Accounts, holds money aside for
payments that have not happened yet (Safe-Pay), and budgets per payday Cycle. Success: a user always
knows their Available Balance — what is truly spendable after Locked Funds — and how much of each
Budget is left before the next payday.

## Positioning

- **Cycle-first**: every summary, Budget, Calendar and Report runs from the user's own payday (Cycle
  Start Day 1–31), e.g. 25 Oct – 24 Nov, not the calendar month.
- **Safe-Pay**: money promised to an upcoming payment is locked out of Available Balance until it is
  settled or cancelled, without pretending it was already spent.

## Operating Context

- Mobile-first web app, installable PWA (`start_url` `/dashboard`), offline read-only; writes need the
  network and fail at once offline with a banner.
- Desktop: sidebar with 10 menus. Mobile: bottom nav (Dashboard, Transactions, centre **+** add
  Transaction, Calendar, "More" sheet). Header: notification bell, language switch, theme toggle.
- Fast entry matters: calculator beside the amount, expressions in the Amount field, quick-amount
  chips, Bulk Entry with paste from Excel.
- Public routes: landing `/`, login, register, forgot/reset password. Protected: onboarding,
  dashboard, transactions, safe-pay, accounts, categories, budgets, calendar, recurring, reports,
  settings.

## Capabilities and Constraints

- Full product spec: `../docs/spec.md`; domain language: `../GLOSSARY.md` (used as-is in code and
  UI); ADRs in `../docs/adr/`. This file does not restate them.
- Stack: Vite, React 19, TypeScript, Tailwind v4, shadcn/ui (radix), lucide-react, React Router,
  TanStack Query, react-hook-form + zod, Supabase, Recharts, i18next. pnpm, Vercel.
- Currency IDR only, integers, displayed `Rp 1.250.000` in both languages.
- Bilingual Indonesian / English (default from browser); dark mode system / light / dark.
- Out of scope v1: goals, debts, CSV import, non-monthly recurrence, credit cards, offline writes,
  email/push, shared accounts.

## Brand Commitments

- Name **Cawang** ("cabang", a branch). Logo (2026-11-20): a green stem branching into three gold
  coins — money that grows on a branch. Source files: `/Users/mkp/Downloads/cawang-favicon/`
  (favicon.svg / .ico, 16/32 px, apple-touch-icon, icon-192/512, site.webmanifest). Logo colours as
  drawn: green `#2F6B2F`, gold `#E9B21A`, cream `#F6FAEE`. The logo replaces the previous C +
  candlesticks BrandMark.
- **Semantic data colours are binding** (confirmed 2026-11-20): green = Income, red = Expense,
  neutral/blue = Transfer, amber = Locked Funds / Safe-Pay. Brand identity must not blur them.
- Full redesign of every surface (landing, auth, onboarding, all app screens) confirmed 2026-11-20;
  the previous pastel-consumer look is not binding.

## Evidence on Hand

- The landing page (rebuilt 2026-11-21) proves the product with its own components and sample money,
  labelled as made up; it uses no photographs (the earlier Wikimedia set was removed).
- No testimonials, user counts, press, ratings or pricing exist. Do not fabricate them.

## Product Principles

1. Available Balance is the truth the user acts on; it is never hidden behind Total Balance.
2. Logging a Transaction must be faster than forgetting it.
3. Payday, not the calendar, sets the rhythm.
4. Money states are never ambiguous: Income, Expense, Transfer and Locked Funds always read
   differently.
5. Honest by default: no invented proof, no dark patterns around destructive actions.

## Accessibility & Inclusion

Bilingual ID/EN; amount visibility toggle (hide amounts in public); both light and dark themes must
be fully usable.
