# R04 palette: 60 ivory / 30 deep oxblood / 10 gold

Ruled by Dofrane 2026-09-13. Supersedes the R04 two-colour law (40% oxblood / 60% ivory) ruled earlier
the same day, and the 2026-09-09 brand accent (midnight `#0C1A4D`). Shares are measured by painted
area across the page. `brand-tokens.css` holds the values; the brand playbook (v1.0, Drive
`06_Brand/Brand Playbook/DA_BRAND_PLAYBOOK.md`) records the ruling.

| Share | Role | Token | Hex | RGB | HSL |
|---|---|---|---|---|---|
| 60% | Ground | `--da-ivory` | `#FAF4E4` | 250, 244, 228 | 44, 69%, 94% |
| (60%) | Band step | `--da-ivory-alt` | `#F2ECD9` | 242, 236, 217 | 46, 49%, 90% |
| 30% | Ink, structure | `--da-oxblood` | `#3D0606` | 61, 6, 6 | 0, 82%, 13% |
| 10% | Accent | `--da-gold` | `#C5A059` | 197, 160, 89 | 39, 48%, 56% |
| (10%) | Accent on ivory | `--da-gold-ink` = gold 60 / oxblood 40 | `#8F6238` | 143, 98, 56 | 29, 44%, 39% |
| (10%) | Highlight surface | `--da-gold-tint` = gold 15 over ivory | `#F2E7CF` | 242, 231, 207 | 42, 57%, 88% |

Gold-ink and gold-tint are derived from the three colours, not new colours.

## Where each colour lives on the page

| Section | Ground | Accent |
|---|---|---|
| Header, footer | Oxblood | Gold icons and brand line; inverted CTA |
| Hero (photo + 80% oxblood scrim) | Oxblood | Gold check icons; kicker stays ivory (see scrim rule) |
| Trust bar | **Gold, the one gold band** | Oxblood type and icons |
| Proof card | Oxblood | Gold column titles |
| Direct sale, why, service area | Ivory | Default CTA with gold circle |
| Process | **Gold 22% over ivory, the one tinted section** | Solid gold step pills |
| Situations, compare, FAQ | Ivory-alt 60% | Gold-ink icons; compare "ours" row gold-tint with gold-ink border |
| Ask band (photo + 88% oxblood scrim) | Oxblood | Gold note; inverted CTA |
| Lead form | Card on ivory | Gold-ink progress, checked radios on gold-tint |

## Contrast, computed (WCAG 2 relative luminance, color-mix in sRGB)

| Pair | Ratio | Use | Result |
|---|---|---|---|
| Oxblood on ivory | 15.59 | Body, headings | AA / AAA |
| Oxblood on ivory-alt | 14.49 | Tinted sections | AA / AAA |
| Ivory on oxblood | 15.59 | Dark sections | AA / AAA |
| Gold on oxblood | 6.96 | Kickers, titles, CTA label on dark | AA |
| Oxblood on gold | 6.96 | Trust band type | AA |
| Oxblood on oxblood 10% over gold | 5.84 | Trust icon disc | AA |
| Oxblood on gold-tint 15 | 13.98 | Compare highlight row | AA / AAA |
| Oxblood on gold-tint 22 | 13.27 | Tinted process section | AA / AAA |
| Muted on gold-tint 22 | 4.85 | Secondary text, tinted section | AA |
| Gold-ink on ivory | 4.81 | Accent on light grounds | AA |
| Gold-ink on card field | 5.17 | Form accents | AA |
| Gold-ink on ivory-alt 60% band | 4.60 | Icons (text allowed, narrowly) | AA |
| Gold-ink on ivory-alt | **4.47** | **Icons and rules only, no text** | Fails 4.5 text; meets 3:1 |
| Gold-ink border vs gold-tint 15 | 4.31 | Highlight row edge | Meets 3:1 (non-text) |
| Gold 60% over oxblood vs oxblood | 3.24 | Inverted CTA border | Meets 3:1 (non-text) |
| Muted: oxblood 66% over ivory | 5.70 | Secondary text | AA |
| Gold on 88% oxblood scrim over a white pixel | 5.16 | Gold type over photos, worst case | AA |
| Gold on 84% scrim | 4.54 | Passes by 0.04, not relied on | AA, no margin |
| Gold on 80% scrim | **3.96** | **Icons only** | Fails 4.5 text |
| **Gold on ivory** | **2.24** | **Never** | Fails at every size |
| **Gold on ivory-alt** | **2.08** | **Never** | Fails at every size |

Rules that fall out of the table:
- Gold is never type on ivory. On light grounds the accent is gold-ink.
- Gold-ink text stays on ivory or white fields; on ivory-alt it is for icons and rules.
- Gold type over a photograph needs an oxblood scrim of at least 88%; below that, gold is icons only.
- One gold band per page. Gold never becomes a hero or a full section ground.
- One tinted section per page (gold 22% over ivory) carries the rest of the accent's area. Measured before
  it: solid gold 3.1% of the page, oxblood 29.8%, ivory 67.4%.
- Carried from the two-colour law: muted text at oxblood 66% or darker, control borders at oxblood 48%
  or darker, photo scrims at 72% or darker for ivory type.
