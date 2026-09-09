# Site v1 — archived 2026-09-09

Tagged `site-v1`. Recover with `git checkout site-v1`. Nothing is lost; this file exists so a
rebuild starts from what was learned rather than from a blank page.

## The numbers to beat

Measured by Google on the deployed page, not estimated.

| | v1 | What it replaced (GoDaddy builder) |
|---|---|---|
| Performance, mobile | **99** | 55 |
| Accessibility · Best practices · SEO | **100 · 100 · 100** | 91 · 96 · 100 |
| LCP, mobile | **1.4 s** | **13.0 s** |
| Desktop PageSpeed | completes | **timed out at 120 s** |
| CLS | **0** | 0.061 |
| Page weight, gzipped | **14.1 KB** | 16.9 KB |
| Executable JS | **1,892 B** | a builder runtime |
| Third-party requests | **0** | several |

**A rebuild that lands slower than 1.4 s LCP is a regression**, however it looks. The 13.0 s page
is what the whole exercise existed to escape.

## What must survive the rebuild

These were expensive to establish and none of them is a design preference.

**1. The copy is sourced, not invented.** Every headline traces to a captured seller phrase with a
citation — 29 phrases from 107 comments across 10 threads. Two findings earned their place and
should survive any redesign:
- **The contents outrank the condition, 7 threads of 10.** Sellers are stopped by the *stuff in the
  house*, not the roof. That is why the hero says "Leave what is in it."
- **The stale listing is a top-three situation.** Already listed, price cut, nothing moving. That
  seller has tried the agent route and is the most qualified reader on the page.

Sources: `HOD_CMO/outbox/seo/2026-09-08-da-site-rebuild/SWIPE_FILE.md` and `COPY_RATIONALE.md`.

**2. D1 is ruled: "both, deal-dependent."** `INTENT.md` therefore sends the copy to the
**assignment standard** — it must survive the weaker case. Do not say "we buy your home," do not
imply Dofrane Acquisitions is the purchaser. The hero was corrected to
*"A cash offer in writing. We close it, or we bring the buyer who does."*

**Three own-capital claims were still live at archive and were never fixed** — they are the first
thing to correct in any rebuild, not a nice-to-have:
- `index.html:306` "We buy it as it stands, **with our own money**"
- `index.html:362` section heading "**We are the buyer**, not the broker."
- `index.html:364` "We **sign the contract in our own name**, we put up the deposit"

**3. The fences.** Maryland only, Montgomery and Prince George's — not DC, not Virginia. No
investment-solicitation language. Fair housing on every line. No social presence, ever. No
testimonials, counts or "we've bought N houses" until there is a closed deal and written
permission. No pre-foreclosure or divorce angles — PHIFA exposure and marital status respectively.

**4. `p_consent` is frozen.** The form posts to `inbound_submit(..., p_consent, ...)`. Renaming it
returned `PGRST202` and **failed silently in the browser** — every submission lost. It happened
once. Prove any form change with a real POST before calling it done, and delete the test row.

**5. The brand is locked.** Oxblood `#6E1E2A` · Ivory `#F3ECDD` · Ink `#14100F` · Champagne
`#EFE3C0` · Silver `#C9CDD2`. Two contrast rules are absolute: oxblood never carries text on ink
(1.69), silver and champagne never carry text on a light ground (1.09–1.36). Type is **Fraunces
display + Inter body**, self-hosted, with metric-matched fallbacks and a **+7.5% display
correction** — Fraunces' x-height is 0.444 em against the previous face's 0.477, so removing the
correction silently shrinks every heading.

**6. Maryland statute citations were checked and belong on the page:** Real Property § 10-715
(assignment disclosure), § 10-702 (seller disclosure), § 14-104 (transfer tax default), Courts and
Judicial Proceedings § 10-402 (two-party recording consent).

## What v1 never solved

- **No hero photograph.** `IMAGE_BRIEF.md` specifies the shot; the hero is a CSS duotone stand-in.
- **No logo or wordmark** in any format. The mark is type-only.
- **Section 5 of `INTENT.md`, credibility, does not exist** — no closings, no entity details, no
  testimonials. It rendered empty deliberately rather than fabricated.
- **The form does not submit with JavaScript disabled.** It posts client-side to Supabase; a
  no-JS submission needs a server-side target, which a static site has no place to put.
- **The champagne panel barely separates from ivory** — every pair in the locked palette is within
  1.05:1 on a light ground, so the split is border-defined, not fill-defined.
- The header pill overlaps the wordmark between roughly 416 px and 650 px.

## Defects caught in v1, so they are not rediscovered

A consent field rename that would have silently broken every submission · a contrast token 0.09
short of AA · a form-control border at 2.02:1, under the 3:1 WCAG 1.4.11 floor, which predated all
of this · four of five brand colours drifting from the locked values.

## Where things stand

`dofraneacquisitions.com` **never left GoDaddy.** The domain is assigned to the Vercel project but
DNS still resolves to GoDaddy, deliberately — the flip is one A record, `@ → 216.198.79.1`, and it
was always Dofrane's to throw. Nothing customer-facing was ever changed by any of this work.
