---
version: 1
slug: "src-pages-dashboard-dashboard-page-tsx"
primary_target: "src/pages/dashboard/dashboard-page.tsx"
related_targets: ["src/layouts/app-shell.tsx","src/index.css","src/pages/landing/landing-page.tsx"]
---

# Surface brief: Cawang app screens

Scope: every signed-in screen (shell, Dashboard first, then Transactions, Safe-Pay, Recurring, Budgets, Calendar, Reports, Accounts, Categories, Settings, Onboarding) plus auth screens. Mode: Operate. The landing page (Persuade) extends this world.

Audience/job: young Indonesians logging spending on a phone and checking what is actually free to spend before the next payday. Constraints: semantic colours binding (green Income, red Expense, blue/neutral Transfer, amber Locked Funds / Safe-Pay); light and dark both first-class; ID/EN; amount hiding.

Chosen direction: "Tanggal Gajian", picked from a safer-register round after the user found earlier worlds too themed. User wants a clean, familiar finance app whose identity is the new logo.

## Direction contract

THESIS: A clean, familiar finance app whose identity is the logo itself (deep branch green, gold coins) and whose one signature is the Cycle strip: the days from payday to payday in a row. It refuses the grey-card-plus-one-accent default and any themed costume.

OWN-WORLD: Deep logo-green shell (mobile header band carrying Available Balance; desktop sidebar), pale leaf-tinted ground (#F6FAEE family), white cards with hairline green-grey borders, 18-20px radii. Gold #E9B21A appears only on the logo and on Locked Funds / Safe-Pay. Income is a fresher green than the shell, Expense brick red, Transfer slate blue. Manrope throughout, tabular figures, Rp set smaller than digits. Dark mode: near-black green ground, the shell a deep forest band.

STORY: The visitor sees Available Balance first, then where today sits in the Cycle, then what happened today and which Budgets run low; they add a Transaction from the centre + without thinking.

FIRST VIEWPORT: Mobile: green band with logo, utilities, "Saldo Tersedia" figure (36px), Total and Locked chips; directly below, the Cycle strip card (days as columns, payday ringed, today filled green, Safe-Pay due days with a gold dot, past days with a small expense bar); then "Hari ini" list and Budget rows; bottom nav with green centre +. Desktop: green sidebar left, the same band and strip spanning the content column.

FORM: grounded candidate "Tanggal Gajian", safer-register lineup position 1 of 2; seed:1d63486d8aedba66.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Signature interaction

The Cycle strip scrolls horizontally to today on load; tapping a day opens that date's Transactions (`/transactions?date=`). Motion: the strip's today marker settles once on load (ease-out), nothing else animates.

## Unresolved

- Landing page composition inside this world (Persuade, to be built after the app shell).
