# INTENT.md — what this page is for

### Canonical. Read before any work on this repo, by any session, any agent, any lane.
### When a directive and this document conflict, flag it. Do not silently choose.

Rewritten 2026-09-09. The file previously committed here was the Boardroom charter, committed in
error at `82fa3a7`. `replit.md` and `ARCHIVE.md` both cited a version of this document defining eight
sections with a job and a test each. That version never existed. This is it, written from Dofrane's
own intent line and approved as ruling R10.

---

## THE ONE-PARAGRAPH INTENT

A landing page for a real estate cash buying business specializing in the DMV. One page, one job:
a seller with a house they want out of arrives, recognises their own situation in under five seconds,
and gives us an address. Everything else on this page is in service of that or it does not belong.
No login. No account. No dashboard. No second call to action.

Sellers in the District of Columbia, Maryland and Virginia fill in the form on this page. Breaking it
is not a styling regression. It is a lost lead from someone trying to get out of a house.

---

## WHAT THE PAGE ARGUES, AND WHY

**It argues relief, not speed.** This is a ruling (R3), and it is evidence-backed rather than a
preference. `HOD_CMO/outbox/seo/2026-09-08-da-site-rebuild/SWIPE_FILE.md` captured 29 verbatim seller
phrases from 107 comments across 10 threads. Two findings govern this page:

1. **The contents outrank the condition, 7 threads of 10.** Sellers are stopped by the stuff in the
   house, not the roof. Repairs rank third. That is why the page says "Leave what is in it."
2. **Nothing in 107 comments supports a speed claim.** Not one person asked to close in seven days.
   Speed sells the query. Relief sells the page.

The reference pages this was modelled on (Sundae, QuickDirectSale) both argue speed. We take their
section order, their density and their one-idea-per-block discipline. We do not take their argument
and we do not take a single one of their sentences.

**The objection we are answering is arithmetic, not fear.** Sellers do not ask "is this a scam." They
ask "why would I leave 30-50k in their pocket." The page answers that in its own arithmetic, in the
`difference` section, before it is raised.

---

## THE SEVEN SECTIONS

Every section is standalone: `data-section="<id>"` on its root, never renamed; its own partial; a row
in `SECTIONS.md`; and `?section=<id>` isolation in the preview.

| id | Job | Test |
|---|---|---|
| `nav` | Put the action within reach at any scroll depth | Wordmark and one button. Nothing else. Reachable in one tap from any scroll position. |
| `hero` | State the trade and capture the address | Form usable within one thumb-scroll on a 375px phone, before any animation completes |
| `promise` | Remove the three fears that stop a seller submitting | A seller can name what they do not have to do, from three glances, without reading a paragraph |
| `situations` | Let the seller self-identify without reading prose | At least one row is recognisably them within five seconds |
| `difference` | Position against a listing and against an iBuyer without slandering our own category | Every claim in our column is a term we actually offer, not a comparison |
| `cta` | Capture the reader who scrolled the whole page | The only oxblood full-bleed band on the page. One action. |
| `footer` | Legitimacy and compliance | Entity, service area, and every disclosure line isolated for a one-edit swap |

Section 5 of the old numbering, **Credibility, still does not exist and still renders empty**. Ruling
R8: no closings count, no testimonials, no years-operating claim until there is a closed deal and
written permission. The space carries terms instead of claims. Only Dofrane can fill it and nothing
here may invent it.

---

## THE FENCES. A violation here is a legal problem, not a design one.

1. **Service area is the DMV: District of Columbia, Maryland, Virginia.** Ruled R2, 2026-09-09,
   superseding the Maryland-only fence. The Maryland specialization is real but internal: it lives in
   outreach, systems, processes and protocol, and it is never explained on this page.
   **Open consequence:** the desk's jurisdiction gate currently rejects DC and VA rows. Advertising
   the DMV before that gate opens means DMV leads land and stop. That question is with counsel.
2. **D1 is ruled "both, deal-dependent," so all copy is written to the assignment standard.** Never
   state or imply Dofrane Acquisitions is the purchaser. The compliant construction is the model:
   "A cash offer in writing. We close it, or we bring the buyer who does."
3. **No investment-solicitation language.** No returns, yields, IRR, cap rate, "invest with us",
   LP/GP, distributions. This page speaks to a seller. "We are a Maryland investor" is a defect.
4. **Fair housing applies to every published word**, and to the photograph. Nothing that targets or
   excludes a protected class, explicitly or by implication.
5. **No pre-foreclosure angle and no divorce angle.** Maryland's Protection of Homeowners in
   Foreclosure Act creates real exposure; marital status is a protected class. Both are deliberately
   absent, in the copy and in the image.
6. **No testimonials, reviews, counts, or "we have bought N houses"** until there is a closed deal and
   written permission. Placeholder social proof is a defect, not a stopgap.
7. **No third-party rating badge, ever.** We do not have one. An unearned rating is fraud, not
   decoration.
8. **No social links, ever.** Dofrane Acquisitions has no social presence by standing rule.
9. **Three claims belong to the reference pages and never appear here:** the pre-closing cash advance,
   "close in as little as 10 days," and any third-party rating.
10. **Every legal claim cites its statute.** Md. Real Prop. 10-715, 10-702, 14-104; Md. Cts. & Jud.
    Proc. 10-402. Do not write new ones.

Run the linter before shipping copy:
`python3 tools/copy_lint.py index.html` from the HOD_CMO repo.

---

## THE BUDGET, ENFORCED

| Metric | Ceiling |
|---|---|
| LCP, mobile | < 1.5 s |
| Lighthouse performance, mobile | >= 95 |
| CLS | 0 |
| Executable JS, gzipped | < 4 KB |
| Third-party requests | 0 |
| Hero image | < 150 KB, AVIF + WebP, explicit dimensions, never a CSS background |

v1 measured 1.4 s LCP and 1,892 B of JS. The GoDaddy builder page it replaced measured 13.0 s and made
Google's own desktop test time out at 120 seconds. **A rebuild slower than 1.4 s is a regression
however good it looks.** If the budget breaks, the motion goes, not the budget.

---

## WHAT ONLY DOFRANE CAN FILL

- The credibility section. See fence 6.
- The hero photograph. `IMAGE_BRIEF.md` specifies it. Until it exists the hero ships a labelled
  placeholder, which is not finished but is honest.
- The counsel answers: the DC/VA jurisdiction question, the assignment disclosure lines, and the
  "Get Cash Offer" call to action.
- Going live. DNS still points at GoDaddy on purpose. It is one A record and it is his to throw.
