# Rules for any agent or designer working in this repo

This file is for whatever tool opens this repo next — Replit, Cursor, Claude, a human.
Read it before changing anything. Replit reads `replit.md`, which points here.

This is a **live lead-generation page for a real business**. Sellers in Montgomery and Prince
George's County, Maryland fill in the form on it. Breaking it is not a styling regression, it is a
lost lead from someone trying to get out of a house.

---

## The five things that must not break

### 1. `p_consent` — the form's wire field name is frozen
The form posts to a Supabase RPC whose signature is `inbound_submit(..., p_consent, ...)`.
Renaming that field has already broken every submission on this site once. It returned
`PGRST202 Could not find the function` and failed **silently** in the browser.

**Never rename a `p_*` field in the POST body.** If the form changes, prove it with a real POST
before calling it done, and delete the test row afterwards.

### 2. No build step, no framework
This is hand-written static HTML with inlined CSS. That is not laziness, it is the product:
**100/100/100/100 on PageSpeed, LCP 0.8 s, CLS 0.**

The page it replaced was a GoDaddy builder page that measured **13.0 s LCP** and made Google's own
desktop test **time out at 120 seconds**. That is what a framework and a runtime bought the previous
version.

Do not add React, Vite, Next, Tailwind, a bundler, or a CSS framework. If a tool offers to
"modernise" this repo, decline.

### 3. The performance budget is enforced, not aspirational
| Metric | Budget |
|---|---|
| LCP | < 1.5 s mobile |
| Lighthouse performance | ≥ 95 |
| CLS | **0** — every image and font has reserved dimensions or a metric-matched fallback |
| JS shipped | < 2 KB, and the page must be readable with JS off |
| Third-party requests | **zero** — no font CDN, no analytics, no chat widget, no tag manager |
| Hero image, when one exists | < 150 KB, AVIF + WebP, explicit dimensions, never a CSS background |

Fonts are self-hosted in `/fonts/`. **Never link Google Fonts.** They were fetched once at build
time, subset, and committed.

### 4. The brand palette is locked and lives in `brand-tokens.css`
| | | |
|---|---|---|
| Oxblood | `#6E1E2A` | anchor: marks, rules, CTA |
| Ivory | `#F3ECDD` | ground |
| Ink | `#14100F` | type |
| Champagne | `#EFE3C0` | second band value |
| Silver | `#C9CDD2` | hairlines and chrome only |

Off-palette greys (`#333`, `#666`, `#999`) are forbidden by the brand playbook. Every other value on
these pages is a token or a `color-mix()` of one.

Two contrast rules are absolute, computed not guessed:
- **Oxblood never carries text on Ink** (1.69:1). On dark it is a fill, stroked in Champagne.
- **Silver and Champagne never carry text on a light ground** (1.09–1.36:1).

Type: **Fraunces** display, **Inter** body and UI. Display sizes carry a **+7.5%** correction because
Fraunces' x-height is 0.444 em against the previous face's 0.477 em. If you change the face, redo that
correction — a straight swap silently shrinks the hero.

### 5. The content fences — a violation here is a legal problem, not a design one
- **Maryland only: Montgomery County and Prince George's County.** Not DC. Not Virginia.
- **No investment-solicitation language.** No returns, yields, IRR, cap rate, "invest with us",
  LP/GP, distributions. This page speaks **to a seller**; House of Dofrane is the buyer.
- **Fair housing** applies to every published word. Nothing that targets or excludes a protected
  class, explicitly or by implication.
- **No social links, ever.** Dofrane Acquisitions has no social presence by standing rule.
- **No testimonials, reviews, counts, or "we've bought N houses"** until there is a closed deal and
  written permission. Placeholder social proof is a defect, not a stopgap.
- **No pre-foreclosure or divorce angles.** Maryland's Protection of Homeowners in Foreclosure Act
  creates real exposure; the divorce angle is a marital-status problem.
- Every legal claim on the page cites its Maryland statute. Do not write new ones.

Run the linter before you ship copy:
```
python3 tools/copy_lint.py index.html sell/index.html    # in the HOD_CMO repo
```
It also bans em-dashes and en-dashes outside numeric ranges, and words like "solutions" and "unlock".

---

## How this deploys

`main` → Vercel project `da-web` → `https://da-web-six.vercel.app` (the review URL).

`dofraneacquisitions.com` is **assigned to the project but deliberately not serving.** DNS still
points at GoDaddy. Dofrane flips it with one A record when he is satisfied. **Do not change DNS.**

## Where the reasoning lives

The copy is not invention. Every headline traces to a captured seller phrase with a citation:
`HOD_CMO/outbox/seo/2026-09-08-da-site-rebuild/SWIPE_FILE.md` (29 phrases, 107 comments, 10 threads)
and `COPY_RATIONALE.md`. Two findings earned their place and should survive a redesign:

1. **The contents outrank the condition**, 7 threads of 10. Sellers are stopped by the *stuff in the
   house*, not the roof. That is why the hero says "Leave what is in it."
2. **The stale listing** is a top-three situation. Already listed, price cut, nothing moving — that
   seller has tried the agent route and is the most qualified reader on the page.

## What is deliberately missing

- **The hero photograph.** `IMAGE_BRIEF.md` specifies it. The current hero is a CSS duotone
  stand-in, marked as such. It is not finished, it is honest.
- **A logo.** HOD has no wordmark in any format yet. The mark is type-only on purpose.
