# SECTIONS.md — the measurement layer

Seven sections. Each is addressable, isolatable and refinable on its own. This is infrastructure, not
decoration: it exists so a section can be dissected without touching the six around it.

## The contract, per section

1. A stable `data-section="<id>"` on the section root. **Never renamed.** Renaming one breaks the
   isolation harness, the refinement log and every screenshot reference in it.
2. Its own partial under `components/sections/`.
3. A row in the registry below: id, job, success test, components used, copy owner.
4. `?section=<id>` renders that section alone on a blank page. **Preview only.** The parameter is
   ignored unless the host is `localhost`, `127.0.0.1` or a `*.replit.dev` preview, so it can never
   fire on the Vercel deployment or on the live domain.

## The registry

| id | Job | Success test | Components | Copy owner |
|---|---|---|---|---|
| `nav` | Put the action within reach at any scroll depth | Wordmark and one button, nothing else. Reachable in one tap from any scroll position. | button (nav weight) | Dofrane |
| `hero` | State the trade and capture the address | Form usable within one thumb-scroll on a 375px phone, before any animation completes | parallax layers, form, button (cta weight) | Dofrane |
| `promise` | Remove the three fears that stop a seller submitting | A seller can name what they do not have to do, from three glances, without reading a paragraph | card, corner marks | Alara, sourced |
| `situations` | Let the seller self-identify without reading prose | At least one row is recognisably them within five seconds | card, corner marks, letter index | Alara, sourced |
| `difference` | Position against a listing and an iBuyer without slandering our own category | Every claim in our column is a term we actually offer, not a comparison | comparison table | Dofrane, counsel |
| `cta` | Capture the reader who scrolled the whole page | The only oxblood full-bleed band on the page. One action, no second link. | button (cta weight) | Dofrane |
| `footer` | Legitimacy and compliance | Entity, service area, and every disclosure line isolated for a one-edit swap | disclosure block | Counsel |

## The refinement loop, one section per cycle

```
SECTION:         which of the seven
JOB:             verbatim from the registry
CURRENT STATE:   what is actually on screen now
FAILING BECAUSE: specific. Never "looks dated".
PROPOSED CHANGE: the minimal change that fixes it
RISK:            what this could break elsewhere
VERIFY BY:       what gets checked after
```

Dofrane approves, the change lands, it is verified, he keeps or reverts.

- **Copy changes and layout changes are separate cycles.** Change both at once and neither result is
  attributable.
- **A change that improves how a section looks but does not advance its stated job is not an
  improvement. Revert it.**
- Screenshots at 375 / 768 / 1440 before and after, into `REFINEMENT_LOG.md`.
- A Replit checkpoint and a git commit before every cycle. Every change one revert away.
- A preview deploy after every cycle, so review happens on a real URL on a real phone.

## What is not on this page

No login. No account. No dashboard link. No second call to action. No social links. No chat widget,
analytics tag, tag manager or third-party font. This page has exactly one job.
