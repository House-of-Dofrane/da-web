# BRAND.md — Dofrane Acquisitions, as this page applies it

**`brand-tokens.css` is the source of truth. This file explains it and fills the two gaps the
playbook leaves open.** If this file and `brand-tokens.css` disagree, the CSS wins and this is wrong.
If the rendered page and `brand-tokens.css` disagree, the page is wrong.

Narrative and the full contrast table: `HOD_CMO/knowledge/brand/DA_BRAND_PLAYBOOK.md` v0.4.
Written 2026-09-09 against the ruling of the same day.

**Three palettes exist and get confused. This is DA's.** The House of Dofrane locked five
(oxblood 6E1E2A, ivory F3ECDD, ink 14100F, champagne EFE3C0, silver C9CDD2) governs HOD's own
surfaces and is not this. The Boardroom reporting palette (navy, blue, gold, green) governs board
pages and dashboards only and is never a brand asset. There is no gold in any of them.

---

## 1. Colour: 60 / 30 / 10

| | Token | Hex | Role |
|---|---|---|---|
| 60% | `--da-ivory` | `#FAF4E4` | Ground. The paper. |
| 60% | `--da-ivory-alt` | `#F2ECD9` | The second band value. A step inside the ground, not a fourth colour. 1.08 against ivory. |
| 30% | `--da-oxblood` | `#4A0404` | Ink and structure: all body and display type, header and footer bands, the one dark band, and the mark. |
| 10% | `--da-midnight` | `#0C1A4D` | Accent: kickers, short rules, corner marks, step numbers, the primary button, links. |

### THE HARD RULE
**Oxblood and midnight never touch.** They measure **1.03** against each other and fail at every size
in both directions. This is not a near miss that can be nudged: oxblood sits at luminance 0.0155, so
every recognisable midnight blue lands between 1.00 and 1.45 of it. The brightest candidate considered
reached 1.68. It is a property of oxblood being the ink, so the rule is permanent.

Ivory carries both, at about 14. Neither carries the other. Wherever they meet, ivory separates them.
**On the oxblood band the accent is `--da-ivory-alt`, which measures 13.57.**

### Derived tokens are mixes, never new colours
Every derived value is one of the three mixed into another, so nothing drifts off palette. Ratios
measured 2026-09-09, not estimated: `--body` 8.18 on ivory, `--muted` 5.53, `--da-dim` 7.47 on
oxblood. Borders only, and never carrying text: `--rule` 1.46, `--rule-dark` 1.57, `--edge` 2.17,
`--edge-dark` 2.02.

**The lesson that produced those numbers: a palette can be entirely AA-clean and still ship an
inaccessible page, because the failures live in the `color-mix()` derivations.** A muted token set by
eye once shipped at 4.41 and dropped Lighthouse accessibility from 100 to 96 on the deployed page.
On ivory, oxblood must be mixed at 60% or more to clear body 4.5. `--muted` is set at 66, not 60,
because a value that clears by 0.09 is a coincidence waiting for a palette tweak to break it.
**Compute the derived token before it ships, not after.**

Off-palette greys (`#333`, `#666`, `#999`) are forbidden.

---

## 2. Type — the scale the playbook leaves as [FILL]

**One family. Helvetica.** `"Helvetica Neue", Helvetica, Arial, sans-serif`. Ruled 2026-09-09,
superseding Fraunces + Inter ruled hours earlier the same day. Helvetica is licensed by Monotype and
is not on Google Fonts, so it cannot be self-hosted. The system stack costs nothing, ships 0 bytes and
makes 0 requests, which is why it was chosen. macOS and iOS render Helvetica Neue, Windows substitutes
Arial, Android Roboto. That platform variation is the accepted trade.

**No `@font-face`. No preload. No CDN. Nothing to size-adjust. Never link Google Fonts.**

There is no second family, so **the scale carries all the hierarchy.** Extracted from the v1 page and
locked here.

| Role | Size | Weight | Tracking | Leading |
|---|---|---|---|---|
| H1, hero | `clamp(2.00rem, 7.20vw, 3.40rem)` | 700 | `-.03em` | 1.06 |
| Display, band | `clamp(1.85rem, 5.40vw, 3.30rem)` | 700 | `-.022em` | 1.12 |
| Display, wide | `clamp(1.60rem, 4.50vw, 2.70rem)` | 700 | `-.022em` | 1.12 |
| Card heading | `1.23rem` | 700 | `-.012em` | 1.35 |
| Body | `1.06rem` | 400 | 0 | 1.68 |
| Card body | `.98rem` | 400 | 0 | 1.62 |
| Footer | `.86rem` | 400 | 0 | 1.65 |
| Kicker | `.66rem` | 400 | `.26em` caps | |
| Hero sub | `.72rem` | 400 | `.2em` caps | |
| Wordmark | `.66rem` | 400 | `.3em` caps | |
| Label | `.68rem` | 500 | `.14em` caps | |
| Button | `.74rem` | 500 | `.18em` caps | |

### The rule the scale encodes
**Tracking tightens as size grows, and every small UI element inverts it.** Hero `-.03em`, display
`-.022em`, card heading `-.012em`, body 0, then labels and buttons go positive from `.14em` to `.3em`
in uppercase. That inversion is the hierarchy system under one family. Do not flatten it.

Display max-width is **22ch**, wide display **30ch**, running text **`min(65ch, 38rem)`**.

---

## 3. Buttons — one primitive, two weights

This is ruling R6, and it also answers D3: **two visually different buttons for one action is not
contrast, it is two languages.** One primitive, two weights, same shape, same arrow, same easing.

| | `nav` | `cta` |
|---|---|---|
| Fill | none | `--da-midnight` on ivory, `--da-ivory-alt` on oxblood |
| Text | `--da-midnight` | `--da-ivory` |
| Border | 1px `--da-midnight` | **`border: 0`** |
| Radius | **0** | **0** |
| Label | Get Offer | Get Cash Offer |

**No border-radius on any button. Radius appears in exactly one place site-wide: form inputs, at 2px.**
Padding `1.05rem 1.2rem`. On the oxblood band the fill inverts to ivory-alt: a midnight button on
oxblood measures 1.03 and its fill is invisible against the ground.

The motion ported from the two reference components: an expanding fill from left, and an arrow that
slides on hover. The pill shape is not ported.

---

## 4. Bands

Sections alternate ivory against ivory-alt. Each band opens on a **midnight caps kicker** over a large
**oxblood display line**.

**At most one oxblood full-bleed band per page** (playbook 3.4 and 7.3). v1 shipped four, which is a
violation the rebuild resolves: **v2 ships exactly one, at `cta`.** The hero carries its photograph and
overlay instead.

The 44 x 1px midnight rule under a display line, `margin: 1.7rem auto`, becomes ivory-alt on dark.

---

## 5. Cards and corner marks

A hairline card carrying a plus mark at each of the four corners, the marks sitting **outside** the
border rather than inside it. Marks are inline SVG referenced from one `<symbol>`: no icon font, no
CDN, no script. They are absolutely positioned, so they add no layout box and cannot shift it.

Geometry, unchanged from v1: mark 11 x 11px, `fill: none`, `stroke-width: 1.4`, `stroke-linecap: round`,
offset **-5.5px** on both axes. Stroke is midnight on light, ivory-alt on dark.

**Card gap is 2rem and that is not arbitrary:** it is what keeps the corner marks of two neighbouring
cards 10px clear of each other. Card padding `clamp(1.4rem,3.4vw,2rem) clamp(1.25rem,3vw,1.8rem)`.

---

## 6. Space

`--measure: 65ch` · `--gap-1: .5rem` · `--gap-2: 1rem` · `--gap-3: 1.75rem` · `--gap-4: 3rem` ·
`--gap-5: 5.5rem` · `--gap-6: 9rem` · `--hdr: 56px`.

Section padding `clamp(4.2rem, 10vw, 8rem) 1.25rem`. **Generous and editorial: few elements per
screen, wide margins.** Grid maxima: `.one 64rem`, `.duo 62rem`, `.trio 60rem`, `.cards 66rem`.

---

## 7. Motion

Ruling R5 re-rules playbook 7.4, which said parallax and image transforms are out.

- **Parallax runs behind the hero and nowhere else.** Four layers, `yPercent` targets 70 / 55 / 40 / 10,
  linear, scrubbed to scroll position with no smoothing. `transform` only: no layout, no paint.
- **It never delays the form becoming usable.** If the script fails, the hero renders static.
- **Off below 768px and off under `prefers-reduced-motion`.**
- Elsewhere, motion is the existing word-by-word scroll reveal behind
  `@supports (animation-timeline: view())` with a plain-visible fallback.
- **No smooth-scroll library.** Native scroll is kept.

---

## 8. The mark

There is no separable mark and no wordmark file. The mark is type-only: `DOFRANE ACQUISITIONS`,
`.66rem`, `.3em` tracking, uppercase. Clear space is never less than 1x the dot diameter from
outermost ink on every side, 2x in the hero. **The mark is never midnight blue.**
