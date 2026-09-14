# R04 palette: 40% deep oxblood / 60% ivory

Ruled by Dofrane 2026-09-13 for the landing page. Two colours, measured by visual weight across the
page: oxblood carries the hero, calls to action and section anchors; ivory carries the body sections.
Midnight is not used on the page. `brand-tokens.css` holds the value; the brand-wide change is
pending his confirmation (the 2026-09-09 ruling was #4A0404 at 60/30/10 with midnight).

| Token | Value |
|---|---|
| `--da-oxblood` | `#3D0606` |
| `--da-ivory` | `#FAF4E4` |
| `--da-ivory-alt` | `#F2ECD9` (a step inside the ivory ground, not a third colour) |

## Contrast, computed (WCAG 2 relative luminance, color-mix in sRGB)

| Pair | Ratio | Use | Result |
|---|---|---|---|
| Oxblood on ivory | 15.59 | Body, headings | AA / AAA |
| Oxblood on ivory-alt | 14.49 | Tinted sections | AA / AAA |
| Oxblood on card (ivory-alt 45%) | 15.08 | Cards, form | AA / AAA |
| Oxblood on field (white 78% over ivory) | 16.77 | Input text | AA / AAA |
| Ivory on oxblood | 15.59 | Dark sections, button text | AA / AAA |
| Ivory-alt on oxblood | 14.49 | Accent on dark | AA / AAA |
| Muted: oxblood 66% over ivory, on ivory | 5.70 | Secondary text | AA |
| Muted 66% on ivory-alt | 5.30 | Secondary text on tint | AA |
| Muted 60% on ivory-alt | **4.35** | **Do not use** | Fails 4.5 |
| Placeholder: oxblood 60% on field | 5.03 | Input placeholder | AA |
| Ivory 72% over oxblood | 8.35 | Dim text on dark | AA / AAA |
| Ivory 66% over oxblood | 7.16 | Disclosures on dark | AA / AAA |
| Input border: oxblood 48% vs field | 3.46 | Form control boundary | Meets 3:1 (non-text) |
| Input border: oxblood 40% vs field | **2.75** | **Do not use for controls** | Fails 3:1 |
| Ivory 40% over oxblood vs oxblood | 3.33 | Outline button border on dark | Meets 3:1 (non-text) |
| Ivory on 80% oxblood scrim over a white photo pixel | 8.86 | Hero and band text, worst case | AA / AAA |
| Ivory on 72% oxblood scrim over a white photo pixel | 6.68 | Minimum scrim allowed | AA |

Rules that fall out of the table:
- Secondary text stays at oxblood 66% or darker; 60% fails on the tinted sections.
- Form control borders stay at oxblood 48% or darker.
- Any photograph behind text carries an oxblood scrim of at least 72%; the page uses 80-84%.
