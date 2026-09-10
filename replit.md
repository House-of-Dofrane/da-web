# Replit — the systematic rebuild

**Read `INTENT.md` first. Then `AGENTS.md`. Then `ARCHIVE.md`.** Those three are the whole brief.
This file is the working method.

---

## What this project is

A live lead-generation page for a real business. Sellers in Montgomery and Prince George's County,
Maryland fill in the form on it. Breaking it is not a styling regression, it is a lost lead from
someone trying to get out of a house.

Site v1 is archived at tag `site-v1` and measured in `ARCHIVE.md`. **You are rebuilding against
those numbers, not from a blank page.**

---

## The method — one section per cycle, never two

`INTENT.md` defines **seven** sections. Each has a **stated job** and a **test**, and `SECTIONS.md`
carries the same seven with their components and copy owner. (The file that used to sit at
`INTENT.md` was the Boardroom charter, committed in error at `82fa3a7`. The eight-section version
this line once pointed at never existed. Rewritten 2026-09-09 as ruling R10.) The rebuild goes
section by section, and each cycle is:

```
SECTION:        which of the eight
JOB:            verbatim from INTENT.md
CURRENT STATE:  what is actually on screen now
FAILING BECAUSE: specific — never "looks dated"
PROPOSED CHANGE: the minimal change that fixes it
RISK:           what this could break elsewhere
VERIFY BY:      what gets checked after
```

Dofrane approves, you change, you verify, he keeps or reverts.

**Copy changes and layout changes are separate cycles.** Change both at once and neither result is
attributable. **A change that improves how a section looks but does not advance its stated job is
not an improvement — revert it.**

---

## The numbers you must not lose

Site v1, measured by Google on the deployed page:

| | v1 | Ceiling |
|---|---|---|
| Performance, mobile | 99 | **≥ 95** |
| LCP, mobile | 1.4 s | **< 1.5 s** |
| CLS | 0 | **0** |
| Executable JS | 1,892 B | **< 2,048 B** |
| Third-party requests | 0 | **0** |

The page v1 replaced measured **13.0 s LCP** and made Google's own desktop test **time out at 120
seconds**. That is what a framework and a runtime bought the previous version. **A rebuild slower
than 1.4 s is a regression however good it looks.**

---

## Five things that must not break

1. **`p_consent` is frozen.** The form posts to a Supabase RPC whose signature is
   `inbound_submit(..., p_consent, ...)`. Renaming it returned `PGRST202` and failed **silently in
   the browser** — every submission lost. It has already happened once. Prove any form change with
   a real POST before calling it done, then delete the test row.

2. **No build step, no framework, no bundler.** Reaffirmed as ruling R1, 2026-09-09, against a
   directive that ordered Next + Tailwind + shadcn + GSAP + Lenis. GSAP, ScrollTrigger and Lenis
   measure 51,727 B gzipped together; the page ships 3,328 B of JS in total and the parallax is
   hand-written. Same motion, same look. Hand-written static HTML with inlined CSS. If a
   tool offers to add React, Vite, Next, Tailwind or a bundler, **decline**. `.replit` runs a plain
   static file server on purpose.

3. **Zero third-party requests.** No font CDN, no analytics, no chat widget, no tag manager. Fonts
   are self-hosted in `/fonts/`. **Never link Google Fonts.**

4. **The palette and type are locked, and the values below are superseded.** DA is Ivory `#FAF4E4`
   60 / Oxblood `#4A0404` 30 / Midnight `#0C1A4D` 10, one family, Helvetica on the system stack.
   See `BRAND.md`. **The hard rule: oxblood and midnight measure 1.03 and never touch.** Historic: Oxblood `#6E1E2A` · Ivory `#F3ECDD` · Ink `#14100F` ·
   Champagne `#EFE3C0` · Silver `#C9CDD2`, in `brand-tokens.css`. Fraunces display, Inter body,
   with metric-matched fallbacks and a **+7.5% display correction** — remove that correction and
   every heading silently shrinks 7%. Two contrast rules are absolute: oxblood never carries text
   on ink (1.69), silver and champagne never carry text on a light ground (1.09–1.36).

5. **The content fences — a violation here is a legal problem, not a design one.**
   DMV: District of Columbia, Maryland, Virginia, ruled 2026-09-09 (R2) · **D1 is ruled "both, deal-dependent," so all
   copy is written to the assignment standard: never state or imply Dofrane Acquisitions is the
   purchaser** · fair housing on every line · no social links, ever · no testimonials, deal counts
   or volume claims until there is a closed deal and written permission · no pre-foreclosure or
   divorce angles.

---

## Deployment

`main` → GitHub → **Vercel**. That is the whole pipeline and it works: pushes deploy in 1–3 seconds.

**Do not publish from Replit.** The Import screen offers a Vercel migration that runs the wrong
direction — it moves hosting *into* Replit and you would lose the domain assignment and the
pipeline. `.replit` deliberately has no real deployment target.

`dofraneacquisitions.com` is assigned to the Vercel project but **DNS still points at GoDaddy on
purpose**. Going live is one A record and it is Dofrane's to throw. **Do not touch DNS.**

---

## The three things v1 left undone

Worth fixing early in the rebuild rather than inheriting:

1. **Three own-capital claims still live**, all failing the D1 assignment standard —
   "with our own money", the heading "We are the buyer, not the broker", and "we sign the contract
   in our own name". These are the largest compliance exposure on the page.
2. **`INTENT.md` §5 Credibility does not exist.** No closings, no entity details, no testimonials.
   It renders empty on purpose — **only Dofrane can fill it, and nothing here may invent it.**
3. **No hero photograph and no logo.** `IMAGE_BRIEF.md` specifies the shot. The hero is a CSS
   duotone stand-in and the mark is type-only.
