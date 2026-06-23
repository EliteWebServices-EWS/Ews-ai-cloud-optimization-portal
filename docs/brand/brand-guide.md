# Elite Web Services — Brand Guide (v1)

**Owner:** Florence
**Phase:** Phase 1, Day 1 — Governance + Repo Refactor
**Status:** Draft for team review

---

## 1. Logo Assets

Source logo was extracted from the official EWS business plan deck (full-resolution master, 1320×1359px, black/gold shield design).

| File | Size | Use case |
|---|---|---|
| `ews-logo-master.png` | 1320×1359 | Source file, print, large hero sections |
| `ews-logo-512.png` | 512×512 | Open Graph / social preview image |
| `ews-logo-256.png` | 256×256 | About page, footer |
| `ews-logo-128.png` | 128×128 | Nav bar (desktop) |
| `ews-logo-64.png` | 64×64 | Nav bar (mobile), dashboard header |
| `ews-logo-32.png` | 32×32 | Small UI badges |
| `favicon.ico` | 16/32/48 | Browser tab favicon |

All files live under `frontend/assets/logo/`.

**Note:** current logo has a solid black background baked in (not transparent). This works cleanly on dark UI but will show a black square if placed on a light/white section. Recommend producing a transparent-background (PNG with alpha) version before the homepage build in Day 2 if the design calls for the logo on white. Flagging this now so Mpho/Uju aren't blocked on Day 2.

---

## 2. Color Palette

Colors below were sampled directly from the logo asset (not eyeballed), so what ships in code matches what's in the mark.

### Primary

| Swatch | Name | Hex | RGB | Usage |
|---|---|---|---|---|
| ⬛ | Black | `#0A0A0A` | 10, 10, 10 | Primary background |
| ⬜ | White | `#FFFFFF` | 255, 255, 255 | Primary text on dark surfaces |
| 🟨 | Gold (primary) | `#DBAC18` | 219, 172, 24 | Buttons, links, borders, icons, CTAs |

### Supporting

| Swatch | Name | Hex | Usage |
|---|---|---|---|
| 🟡 | Gold — light | `#F4C73E` | Hover/highlight states, gradients |
| 🟫 | Gold — dark | `#A8830F` | Pressed/active states, shadows |
| ⬛ | Gray 900 | `#1A1A1A` | Card/panel backgrounds |
| ◻️ | Gray 700 | `#3A3A3A` | Borders/dividers |
| ◻️ | Gray 300 | `#D4D4D4` | Secondary text on dark backgrounds |

### Usage Rules
- **Black** is the dominant background color across the site and the MCC-Lite dashboard (matches the logo's shield background) — this keeps the brand "premium/enterprise" feel consistent with the Mission Cloud-inspired but original direction.
- **Gold** is reserved for accents and calls-to-action only — it should never be used as a large background fill, or it loses impact.
- **White** is for primary body text and headings on dark backgrounds. On any future light-mode section, gold should darken to `--ews-gold-dark` for contrast/accessibility.
- Avoid introducing additional colors (no blues/greens) without a deliberate accessibility or status-color reason (e.g., alert/error states in the dashboard, which should be defined separately in Day 3 when we build alerts/cards).

### Implementation
CSS variables are defined in `frontend/styles/brand-colors.css` and should be imported on every page so Mpho's homepage, Uju's services page, and the MCC-Lite dashboard all pull from the same source instead of hardcoded hex values.

⚠️ **Known conflict:** `frontend/styles/main.css` (merged in PR #14/#15) currently defines its own dark-mode tokens using a blue/cyan/purple "Electric Blue" palette (`--accent-blue: #0A84FF`, etc.), not black/white/gold. This contradicts the Phase 1 scope decision (Mission Cloud-inspired, black/white/gold). Flagging for team decision before Day 2 homepage work — either `main.css` gets re-themed to consume these tokens, or scope needs to be re-confirmed. Not resolving unilaterally since `main.css` is already merged and owned by another task.

```html
<link rel="stylesheet" href="/frontend/styles/brand-colors.css">
```

---

## 3. Open Items for Team
- [ ] Decide if a transparent-bg logo variant is needed before Day 2 homepage build
- [ ] Confirm gold contrast ratio meets WCAG AA when used as text on black (≈4.5:1 minimum) — current `#DBAC18` on `#0A0A0A` passes for large text/UI elements, should double check for small body text
- [ ] Add favicon link + OG image tags once site `<head>` is scaffolded (Day 2)
