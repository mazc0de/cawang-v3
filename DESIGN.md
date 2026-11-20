---
name: Cawang
description: A payday-cycle money app whose identity is its logo, a branch-green stem growing three gold coins, on a pale leaf ground.
colors:
  shell: "#1f4d27"
  shell-ink: "#f1f6ea"
  shell-muted: "#b9cdb1"
  shell-raised: "#2a5e32"
  shell-stem: "#a7d69a"
  logo-green: "#2f6b2f"
  coin-gold: "#e9b21a"
  primary: "#1f4d27"
  primary-ink: "#ffffff"
  leaf-ground: "#f6faee"
  card: "#ffffff"
  raised: "#edf3e3"
  leaf-wash: "#ebf1e1"
  ink: "#15211a"
  muted-ink: "#556657"
  hairline: "#dfe7d3"
  input-stroke: "#c9d5bb"
  brand-soft: "#e2efd5"
  brand-ink: "#1f4d27"
  income: "#23803a"
  income-soft: "#dcf2df"
  expense: "#c2412b"
  expense-soft: "#fbe6e1"
  transfer: "#3f6698"
  transfer-soft: "#e2eaf5"
  locked: "#8a5a00"
  locked-soft: "#fcf0cf"
  caution: "#b4520f"
  caution-soft: "#fdebd9"
  shell-dark: "#11291a"
  shell-ink-dark: "#e6efdf"
  shell-muted-dark: "#9db497"
  shell-raised-dark: "#1b3a23"
  shell-stem-dark: "#8fcb7e"
  logo-stem-dark: "#6fb35f"
  primary-dark: "#2f7a37"
  ground-dark: "#0c120d"
  card-dark: "#141c15"
  popover-dark: "#19221a"
  raised-dark: "#18211a"
  leaf-wash-dark: "#1d271e"
  ink-dark: "#e9f0e3"
  muted-ink-dark: "#a2b29e"
  hairline-dark: "#243025"
  input-stroke-dark: "#34433a"
  brand-dark: "#8fcb7e"
  brand-soft-dark: "#1b2e1d"
  brand-ink-dark: "#c4e5b8"
  income-dark: "#5cc46e"
  income-soft-dark: "#15291a"
  expense-dark: "#f07a66"
  expense-soft-dark: "#2e1915"
  transfer-dark: "#7fa6da"
  transfer-soft-dark: "#152237"
  locked-dark: "#f0be45"
  locked-soft-dark: "#2b2310"
  caution-dark: "#f59a52"
  caution-soft-dark: "#2e1e12"
typography:
  display:
    fontFamily: "Manrope Variable, Manrope, Inter, system-ui, sans-serif"
    fontSize: "6rem"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.04em"
  balance:
    fontFamily: "Manrope Variable, Manrope, Inter, system-ui, sans-serif"
    fontSize: "44px"
    fontWeight: 800
    lineHeight: "52px"
    letterSpacing: "-0.025em"
    fontFeature: "tnum"
  headline:
    fontFamily: "Manrope Variable, Manrope, Inter, system-ui, sans-serif"
    fontSize: "28px"
    fontWeight: 800
    lineHeight: "36px"
    letterSpacing: "-0.025em"
  section:
    fontFamily: "Manrope Variable, Manrope, Inter, system-ui, sans-serif"
    fontSize: "36px"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Manrope Variable, Manrope, Inter, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 700
    lineHeight: 1.5
  figure:
    fontFamily: "Manrope Variable, Manrope, Inter, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 700
    lineHeight: 1.4
    fontFeature: "tnum"
  body:
    fontFamily: "Manrope Variable, Manrope, Inter, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.43
  body-lead:
    fontFamily: "Manrope Variable, Manrope, Inter, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.625
  button:
    fontFamily: "Manrope Variable, Manrope, Inter, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 500
    lineHeight: 1
  label:
    fontFamily: "Manrope Variable, Manrope, Inter, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.4
  micro:
    fontFamily: "Manrope Variable, Manrope, Inter, system-ui, sans-serif"
    fontSize: "11px"
    fontWeight: 500
    lineHeight: 1
rounded:
  sm: "6px"
  md: "8px"
  lg: "10px"
  xl: "14px"
  2xl: "18px"
  card: "20px"
  band: "28px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  card-x: "20px"
  lg: "24px"
  xl: "40px"
  section: "96px"
  section-wide: "144px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-ink}"
    typography: "{typography.button}"
    rounded: "{rounded.lg}"
    padding: "0 16px"
    height: "40px"
  button-primary-hover:
    backgroundColor: "rgba(31, 77, 39, 0.8)"
  button-secondary:
    backgroundColor: "{colors.leaf-wash}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "0 16px"
    height: "40px"
  button-outline:
    backgroundColor: "{colors.leaf-ground}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "0 16px"
    height: "40px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    height: "40px"
  button-destructive:
    backgroundColor: "rgba(194, 65, 43, 0.1)"
    textColor: "{colors.expense}"
    rounded: "{rounded.lg}"
    padding: "0 16px"
    height: "40px"
  button-on-shell:
    backgroundColor: "{colors.card}"
    textColor: "{colors.shell}"
    rounded: "{rounded.lg}"
    padding: "0 28px"
    height: "48px"
  input:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "4px 12px"
    height: "40px"
  card:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "16px 20px"
  shell-band:
    backgroundColor: "{colors.shell}"
    textColor: "{colors.shell-ink}"
    rounded: "{rounded.card}"
    padding: "24px 28px"
  shell-tile:
    backgroundColor: "{colors.shell-raised}"
    textColor: "{colors.shell-ink}"
    rounded: "{rounded.2xl}"
    padding: "10px 14px"
  cycle-day:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
    width: "40px"
  cycle-day-today:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-ink}"
    rounded: "{rounded.xl}"
    width: "40px"
  sidebar-item:
    backgroundColor: "transparent"
    textColor: "{colors.shell-muted}"
    rounded: "{rounded.lg}"
    padding: "0 10px"
    height: "36px"
  sidebar-item-active:
    backgroundColor: "{colors.shell-raised}"
    textColor: "{colors.primary-ink}"
    rounded: "{rounded.lg}"
    padding: "0 10px"
    height: "36px"
  bottom-nav-add:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-ink}"
    rounded: "{rounded.2xl}"
    size: "52px"
  status-pill-running-low:
    backgroundColor: "{colors.caution-soft}"
    textColor: "{colors.caution}"
    rounded: "{rounded.full}"
    padding: "0 10px"
    height: "24px"
  status-pill-over:
    backgroundColor: "{colors.expense-soft}"
    textColor: "{colors.expense}"
    rounded: "{rounded.full}"
    padding: "0 10px"
    height: "24px"
  locked-chip:
    backgroundColor: "{colors.locked-soft}"
    textColor: "{colors.locked}"
    rounded: "{rounded.full}"
    padding: "2px 10px"
---

# Design System: Cawang

## Overview

**Creative North Star: "Tanggal Gajian"**

Cawang looks like a clean, familiar finance app that happens to have grown out of its own logo. The deep branch green of the stem is the chrome: the desktop sidebar, the mobile top bar, and the balance band that continues it down into the Dashboard. Everything the user reads and edits sits below that chrome on a pale leaf ground in white cards with hairline green-grey borders. The logo's coin gold is not a brand accent; it appears only on the mark itself and on money that is locked for a Safe-Pay.

The system's one signature is the Cycle strip: every day from this payday to the next in a single row, the payday ringed, today filled green, a gold dot where a Safe-Pay falls due, a small expense bar under each past day, and the next payday closing the row as a dashed ring. Payday, not the calendar month, is the rhythm the eye learns. Density is calm and phone-first: one column of cards on a phone, a 3:2 split on desktop, generous 16-20px card padding, figures in tabular numerals with "Rp" set smaller and quieter than the digits.

The world refuses the grey-card-plus-one-accent default and any themed costume. It is quiet by construction: flat cards, one authored motion in the app, and colour that carries meaning (Income, Expense, Transfer, Locked) rather than decoration. Light and dark are equally finished; dark mode turns the ground near-black green and the shell into a deep forest band.

**Key Characteristics:**
- Branch-green shell chrome (sidebar, mobile top bar, Dashboard balance band) over a pale leaf ground.
- White, flat, bordered cards with 20px corners; controls at 10px.
- Coin gold reserved for the logo and Locked Funds / Safe-Pay.
- Four fixed money hues: Income green, Expense brick red, Transfer slate blue, Locked amber.
- Manrope throughout, extrabold for figures and titles, tabular numerals everywhere money appears.
- The Cycle strip as the signature component; today's cell settles once on load and nothing else in the app animates.

## Colors

A two-greens-and-a-gold identity drawn from the logo, laid over a cream-leaf neutral family, with four semantic money hues that the brand never borrows.

### Primary
- **Branch Shell Green** (#1f4d27, `--shell`; also `--primary` and `--brand-ink` in light): the chrome colour. Fills the desktop sidebar, the mobile top bar, the Dashboard balance band, the auth page's right panel and the landing hero and closing CTA. In light mode it is also the primary button, today's cell in the Cycle strip and the centre + in the bottom nav. In dark mode the shell deepens to Forest Night (#11291a) and primary lifts to #2f7a37 so it still reads against the near-black ground.
- **Logo Stem Green** (#2f6b2f, `--brand`, `--ring`): the green as drawn in the logo. Used for the focus ring, form accent and caret colour, the payday ring and the dashed next-payday ring in the Cycle strip, and the "safe" fill of the budget bar. In dark mode this role moves to Lit Leaf (#8fcb7e).
- **Shell family** (shell-ink #f1f6ea, shell-muted #b9cdb1, shell-raised #2a5e32, shell-stem #a7d69a): the inks and surfaces that exist only inside the shell. Shell-raised is the tile and active-nav surface on green; shell-stem is the logo stem inside the shell, the user avatar and the shell focus ring.

### Secondary
- **Coin Gold** (#e9b21a, `--gold`): the logo's coins. Outside the mark it appears only as Locked Funds inside the shell (the shell scope re-points `--locked` to gold), the Safe-Pay due dot in the Cycle strip, and the Safe-Pay switch in the landing hero.

### Tertiary (semantic money hues)
- **Income Green** (#23803a / dark #5cc46e): Income amounts and totals. Deliberately fresher and lighter than the shell green so "money in" never reads as chrome.
- **Expense Brick** (#c2412b / dark #f07a66): Expense amounts, over-budget fill and pills, the Cycle strip's daily spending bars (at 60% opacity), and destructive actions.
- **Transfer Slate** (#3f6698 / dark #7fa6da): Transfer amounts. Never used as a generic link or info blue.
- **Locked Amber** (#8a5a00 / dark #f0be45): Locked Funds and Safe-Pay on page surfaces, including the hatched pending segment of the budget bar over Locked Soft (#fcf0cf).
- **Caution Orange** (#b4520f / dark #f59a52): "Running low" budget status only. Distinct from Locked Amber.
- Each hue has a soft partner (`-soft`) used as a pill or tile background with the full hue as ink.

### Neutral
- **Leaf Ground** (#f6faee / dark #0c120d): the page background, matching the logo's ground.
- **Card White** (#ffffff / dark #141c15): cards, inputs, the bottom nav, popovers (dark popover #19221a).
- **Leaf Wash** (#ebf1e1 / dark #1d271e): secondary buttons, muted fills, hover rows, the empty budget track.
- **Raised Leaf** (#edf3e3 / dark #18211a): a slightly raised tint for inset surfaces.
- **Forest Ink** (#15211a / dark #e9f0e3): body text and figures.
- **Moss Grey** (#556657 / dark #a2b29e): secondary text, labels, weekday initials, future days.
- **Hairline** (#dfe7d3 / dark #243025): every card border and divider.
- **Input Stroke** (#c9d5bb / dark #34433a): input borders and scrollbar thumbs.
- **Category palette**: ten pale-tile-with-own-dark-ink pairs (blue, sky, teal, green, lime, orange, rose, pink, brown, slate) for Category tiles, with mid-tone chart equivalents. No amber, violet or indigo.

### Named Rules
**The Chrome-Only Shell Rule.** Branch Shell Green as a surface belongs to chrome: the sidebar, the mobile top bar, the Dashboard balance band, the auth side panel and the landing hero and CTA bands. Content cards never turn green; a card placed inside a green band restores page tokens with the unshell scope.

**The Coin Gold Rule.** Gold appears on the logo and on Locked Funds / Safe-Pay, nowhere else. It is never a highlight, a badge, a chart series or a call to action.

**The Four Money States Rule.** Income is green, Expense is red, Transfer is blue, Locked is amber/gold, in both themes, on every screen. Brand colour, Category colours and status colours never take one of these roles, and money is always shown through the Money figure with its tone, never by hand-picking a colour.

## Typography

**Display Font:** Manrope Variable (with Manrope, Inter, system-ui)
**Body Font:** Manrope Variable (same stack)

**Character:** One geometric-humanist sans in every role. Hierarchy comes from weight (800 for figures and titles, 600-700 for section and card headings, 400-500 for reading text) and from tabular numerals, not from a second family.

### Hierarchy
- **Display** (800, clamp(64px, 7vw, 6rem) on desktop and min(11.5vw, 6rem) below it, line-height 0.98, -0.04em): landing only, for the masked hero headline, the "how it works" headline and the closing CTA. Never in the signed-in app.
- **Balance** (800, 38px/44px on phones, 44px/52px on desktop, -0.025em, tabular): Available Balance in the shell band. The auth fragment uses the same treatment at 32px/40px.
- **Headline** (800, 24px on phones, 28px/36px on desktop, -0.025em): the page h1 and auth headings.
- **Section** (600, 28px on phones, 36px from sm up, line-height 1.25, -0.025em): landing section headings.
- **Title** (700, 16px): card headings ("Cycle ini", "Hari ini", "Budget").
- **Figure** (700, 17px, tabular): summary amounts under a 13px label; shell tiles use 16px.
- **Body** (400, 14px, line-height 1.43): list rows, empty states, nav items (500). Secondary reading text runs at 15px.
- **Body Lead** (400, 17px, line-height 1.625, max 40-48ch): landing paragraphs.
- **Label** (400-500, 13px or 12px, Moss Grey): figure labels and group labels in sentence case.
- **Micro** (500-600, 10-11px): Cycle strip weekdays and bottom-nav labels only.

### Named Rules
**The Small Rp Rule.** Every amount is set in tabular figures with "Rp" at 0.72em, weight 500, 70% opacity, before the digits; hidden amounts keep the Rp and replace the digits with a mask. Money is never typeset without this treatment.

**The 6rem Ceiling Rule.** Display type tops out at 6rem. The app's largest type is the 44px Available Balance; anything bigger lives on the landing page under the ceiling.

## Layout

Phone-first. On phones the green top bar (56px, sticky) carries the wordmark and utilities, and the Dashboard's balance band continues it edge to edge with a 28px rounded bottom. Content sits in a single column with a 16px gutter (24px from 640px), cards stacked 16px apart, and 112px of bottom padding to clear the fixed bottom nav (64px plus safe area). The bottom nav is five equal cells with the centre + lifted 20px above the bar.

From 1024px the 240px green sidebar replaces the top bar and bottom nav, the page gutter becomes 40px, and content is capped at 1200px. The balance band becomes the first rounded card in the column, with Total and Locked tiles in a 420px block to the right of the figure. Below the Cycle card, the Dashboard splits 3:2 (Today on the left, Budgets and Recurring stacked on the right) with 24px gaps.

The Cycle strip scrolls horizontally with snap-to-centre and faded 20px edges below 1280px, scrolling itself so today sits centred on load; from 1280px every day fits and cells share the width.

Card interiors use 16px horizontal padding on phones and 20px from 640px, with headings at 16px from the top. Auth screens split 50/50 from 1024px: a 380px form column on the leaf ground and the green panel with a sample balance card. The landing page uses a 12-column grid capped at 1180px, 96px section padding (144px from 1024px), and a full-viewport green hero.

## Elevation & Depth

The app is flat. Depth comes from tonal layering: white cards with a 1px hairline on the leaf ground, and on green, shell-raised tiles one step lighter than the shell. Shadows are reserved for things that genuinely float above the page.

### Shadow Vocabulary
- **Add-button lift** (`box-shadow: 0 6px 16px -4px rgb(31 77 39 / 0.45)` plus a 4px ring in the card colour): the centre + in the bottom nav, which breaks out of the bar.
- **Floating sample** (`box-shadow: 0 24px 60px -24px rgb(0 0 0 / 0.45)`): the sample balance card on the auth page's green panel.
- **Landing chip float** (`box-shadow: 0 10px 30px -12px rgb(0 0 0 / 0.35)`): the three interactive hero chips on the landing page.
- **Overlay** (the component library's medium and large shadows): popovers, dropdown menus, selects, chart tooltips and sheets, which float above the page by nature.

### Named Rules
**The Flat Card Rule.** Cards, list rows and the balance band carry no shadow. If something needs to stand out, it changes tone or border, not elevation.

**The No Nested Cards Rule.** A card never sits inside another card. Inside a card, group with dividers (hairline top borders) and spacing; inside the green band, group with shell-raised tiles, which have no border.

## Shapes

Two radii do almost all the work: 20px for cards and large containers (the balance band, the bottom sheet's top corners, landing specimen tops) and 10px for controls (buttons, inputs, nav items, Category tiles). In between, 14px rounds Cycle strip day cells, dialogs and list-level blocks, 18px rounds the shell tiles and the centre + button, and the phone balance band takes a 28px bottom curve where it meets the content. Pills, status chips, avatars and day numbers are fully round. Borders are 1px hairlines; the only strokes heavier than that are the 2px payday ring (solid) and next-payday ring (dashed) in the Cycle strip. The logo is drawn with round line caps and the same circle-and-stroke vocabulary.

## Components

### Buttons
Familiar and quiet: solid green for the one main action, everything else tonal.
- **Shape:** gently rounded (10px), 40px tall, 16px horizontal padding; small 32px, large 44px, icon-only square.
- **Primary:** Branch Shell Green with white text, 14px medium. Hover fades the fill to 80%.
- **Hover / Focus:** colour transitions only; focus draws a 3px ring of the ring colour at 50% plus a ring-coloured border; pressing nudges the button down 1px.
- **Secondary / Outline / Ghost:** secondary is Leaf Wash; outline is a hairline border on the ground; ghost has no fill until hover (Leaf Wash). Destructive is a 10% Expense Brick tint with brick text, never a solid red block.
- **On-shell:** on green bands (landing hero and CTA) the primary action inverts to a white button with shell-green text, 48-56px tall and bold 17px; the secondary is a transparent outline at 40% white.

### Chips and Pills
- **Budget status:** 24px full-round pill, 12px medium. Running low is Caution Soft with Caution ink; over is Expense Soft with Expense ink; safe is Leaf Wash with Moss Grey.
- **Locked chip:** Locked Soft with Locked ink and a lock icon, full round, on page surfaces only. Inside the shell, Locked Funds are shown in Coin Gold instead.

### Cards / Containers
- **Corner Style:** 20px.
- **Background:** Card White (dark #141c15).
- **Shadow Strategy:** none (see The Flat Card Rule).
- **Border:** 1px Hairline.
- **Internal Padding:** 16px on phones, 20px from 640px; sections inside a card are separated by hairline top borders, never by nested cards.

### Inputs / Fields
- **Style:** 40px tall, Card White fill (dark: input stroke at 30%), 1px Input Stroke border, 10px radius, 12px horizontal padding, 16px text on phones and 14px from 768px.
- **Focus:** border shifts to the ring colour with a 3px ring at 50%.
- **Error / Disabled:** error sets an Expense Brick border and a 20% brick ring; disabled drops to 50% opacity.

### Navigation
- **Desktop sidebar:** 240px, Branch Shell Green, sticky full height. Wordmark at top, groups with 12px Moss-on-green labels, 36px items at 14px medium with 16px icons. Inactive items are shell-muted and brighten on hover over a 60% shell-raised fill; the active item is a shell-raised pill with white semibold text. Settings, install, the account row and the version sit at the bottom.
- **Mobile top bar:** 56px, sticky, green, wordmark left and utilities (amount toggle, notifications, language, theme) right.
- **Bottom nav:** 64px white bar with a hairline top, five cells (Dashboard, Transactions, centre +, Calendar, More) with 20px icons over 11px labels. Active is bold Branch Shell Green (dark: Lit Leaf). The centre + is a 52px green square with 18px corners, lifted 20px, ringed in the card colour, with the add-button lift shadow. More opens a bottom sheet with 20px top corners.

### Shell Balance Band
The Dashboard's first block: a green band showing "Saldo Tersedia" with its show/hide eye, the Available Balance figure, and two shell-raised tiles for Total Balance (with account count) and Locked Funds (lock icon, figure in Coin Gold, links to Safe-Pay). On phones it bleeds to the screen edges and curves at the bottom; on desktop it is a 20px-rounded card.

### Cycle Strip (signature)
A row of day cells from payday to the day before the next payday, followed by the next payday itself.
- **Day cell:** 40px wide (fills the width from 1280px), 14px radius; a 10px weekday initial, a 28px round tabular date (24px from 1280px), a 6px slot for the gold Safe-Pay due dot, and an 18px slot for the day's expense bar (14px wide, 3px top corners, Expense Brick at 60%, square-root scaled to the Cycle's heaviest day, minimum 3px).
- **Payday:** date ringed 2px inset in Logo Stem Green. **Next payday:** closes the row with a "Gajian" label and a 2px dashed green ring.
- **Today:** the whole cell filled Branch Shell Green with white text and a 60% white expense bar.
- **Past and today** link to that date's Transactions and take a Leaf Wash hover; **future** days are not links and drop to Moss Grey semibold.
- **Motion:** today's cell settles once on load (scale 0.86 to 1 with a fading 6px green halo, 700ms, ease-out-expo, 150ms delay), skipped under reduced motion.

### Money Figure
Every amount renders through one component: tabular figures, the small Rp, an optional sign (+ Income, − Expense, using a true minus), and a tone (default, income, expense, transfer, locked, muted). Zero amounts drop to muted.

### Budget Bar
A 10px full-round track in Leaf Wash. The spent part fills with Logo Stem Green when safe, Caution when running low and Expense Brick when over; pending Safe-Pays follow as a 45-degree hatch of Locked Amber over Locked Soft, drawn but not counted as spent.

### Category Tile
A 40px (32px in dense rows) 10px-rounded tile in the Category's pale colour with a 1.75-stroke icon at 45% size in the colour's own dark ink.

### Landing motion
The landing page has its own single entrance: the two hero headline lines rise out of a mask from the baseline (900ms, ease-out-expo, second line 110ms later), then the supporting paragraph and actions fade up 16px (600ms, after 650ms). Every other section renders at rest. Both are removed under reduced motion.

## Do's and Don'ts

### Do:
- **Do** keep Branch Shell Green as a surface on chrome only: sidebar, mobile top bar, Dashboard balance band, auth side panel, landing hero and CTA bands.
- **Do** wrap anything placed on a green band in the shell scope so text, borders and focus rings resolve to shell inks, and restore page tokens with the unshell scope for a white card on green.
- **Do** render every amount through the Money figure with its semantic tone: green Income, red Expense, blue Transfer, amber Locked (gold inside the shell).
- **Do** use gold only on the logo and on Locked Funds / Safe-Pay (the Locked figure on green, the Safe-Pay due dot, the Safe-Pay switch).
- **Do** build cards as flat white surfaces with a 1px hairline and 20px corners, and controls at 10px.
- **Do** separate groups inside a card with hairline dividers and spacing, and groups inside the green band with shell-raised tiles.
- **Do** finish every screen in both light and dark; each token has a dark pair and both themes are first-class.
- **Do** use Manrope only, weight 800 for figures and titles, tabular numerals for all numbers, and sentence case for labels.
- **Do** keep the today-settle moment as the app's one authored motion; state changes use plain colour transitions and press feedback only.

### Don't:
- **Don't** fill content cards, list rows or dialogs with shell green, and don't use shell green as a generic accent.
- **Don't** use gold or amber for highlights, badges, chart series, Category colours or calls to action.
- **Don't** colour money by hand, or let brand green stand in for Income or red stand in for anything but Expense and destructive actions.
- **Don't** nest a card inside a card.
- **Don't** add shadows to cards; shadows belong only to overlays, the floating + button, the auth sample card and the landing hero chips.
- **Don't** add entrance, scroll or hover animations to app screens beyond the today-settle moment; the component library's quick overlay open and close fades are state feedback, not authored motion.
- **Don't** set display type above 6rem, and don't use display sizes inside the signed-in app.
- **Don't** introduce a second typeface or uppercase-tracked labels.
