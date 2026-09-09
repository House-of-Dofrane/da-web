# da-web

Public site for **Dofrane Acquisitions** at **dofraneacquisitions.com**.

Static HTML, no build step, no dependencies. Open `index.html` in a browser to run it.
Deploy: push to `main`; Vercel auto-deploys.

## What this replaced

The GoDaddy Website Builder page that was live until 2026-09-08. Measured by Google that day:
mobile LCP **13.0 s** against a "poor" threshold of 4.0 s, performance 55/100, and desktop
PageSpeed **timed out at 120 s**. This build is 7.4 KB gzipped with zero external subresources,
so the document arrives in one round trip. The sibling site on the same host and file shape
measures 0.8 s.

## Positioning

Dofrane Acquisitions buys houses directly from owners. Every word on the page speaks **to a
seller**, never to another investor. The page it replaced led with "Invest Smart, Live Better",
which pitched investors on a page whose only job is to convert sellers.

## Standing constraints

- **Maryland only: Montgomery County and Prince George's County.** Not DC, not Virginia.
- **No investment-solicitation language.** No returns, yields, capital raise, IRR, cap rate.
- **Fair housing** applies to every published word.
- **No social presence.** This site and its market pages are the entire public surface.
- The wholesale legal memo is the only source for any legal claim on the page.

## Provenance

The copy is written from captured seller language, not invention: 29 verbatim phrases across
10 threads, ranked by repetition and cited in `docs/SWIPE_FILE.md`. Every headline traces to a
phrase and a keyword in `docs/COPY_RATIONALE.md`. Lines that could not be sourced are labelled
as such rather than quietly kept.

## Form

Posts to the `inbound_submit` RPC on Supabase with a **publishable** (client-side) key. No secret
key is present in this repo. Consent is collected as two checkboxes: call/email required, text
separate and optional. Text consent is not yet stored — see the open item below.

## Open

- Text consent is collected and not stored. Texting stays off until `inbound_submit` accepts it.
- No MX record on the domain, so the form is the only contact path and has no email fallback.

## Why this repo is public

It serves a public marketing page and nothing else. Every byte here is already delivered to
anyone who loads `dofraneacquisitions.com`. The only credential present is a Supabase
**publishable** key, which is designed for client-side use and appears in the page source by
design; no service-role or secret key exists in this repo or its history.

Internal strategy stays out. The swipe file, the copy rationale and the gate card live in
`HOD_CMO/outbox/seo/2026-09-08-da-site-rebuild/` and are not published here.

Public is also what makes the deploy free: importing a **private** repo into a Vercel team
requires a Pro plan at $20/month. A public marketing site does not.
