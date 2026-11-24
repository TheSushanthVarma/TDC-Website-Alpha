# TechDemocracy — Alpha (Next.js)

Home page on a Swiss grid with Manrope and a high-contrast type scale.

## Run
```
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
```
Press **G** (or the Grid button) to show the column overlay.

## Grid
IBM Carbon 2x model with GitHub-style container margins.

| Breakpoint | Columns | Gutter | Margin |
|---|---|---|---|
| ≥ 1056px | 16 | 32px | 32px |
| 672–1055px | 8 | 24px | 24px |
| < 672px | 4 | 16px | 16px |

Max width 1584px. Place elements with `l-START-END` (16-col) and `m-START-END` (8-col) classes, e.g. `l-5-15` = columns 5 to 14. Small screens stack full width. Helpers are generated in `app/grid.css`.

## Type scale (Manrope)
| Token | Size | Weight |
|---|---|---|
| `.t-display` | 64 → 208px | 800 |
| `.t-h2` | 40 → 88px | 700 |
| `.t-h2-alt` | 30 → 56px | 600 |
| `.t-h3` | 26 → 36px | 700 |
| `.t-h4` | 19 → 22px | 600 |
| `.t-lead` | 19 → 23px | 400 |
| `.t-body` / `.t-small` | 16 / 14px | 400 |
| `.t-cap` | 12px caps | 700 |

## Files
- `app/page.js` — home page sections
- `app/globals.css` — tokens, type, components
- `lib/content.js` — all placeholder copy
- `lib/patterns.js` — abstract canvas patterns
- `components/` — Pattern, Console, Services tabs, FAQ, grid overlay, GSAP motion
