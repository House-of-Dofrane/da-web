# Replit — read AGENTS.md first

Full rules: **[AGENTS.md](./AGENTS.md)**. The short version, because these are the ones a design
tool breaks by default:

1. **No framework, no build step, no bundler.** Hand-written static HTML with inlined CSS. This
   scores 100/100/100/100 with LCP 0.8 s. The page it replaced used a builder and measured 13.0 s.
   If you are offered React, Vite, Next or Tailwind here, decline.
2. **Zero third-party requests.** No Google Fonts link, no analytics, no chat widget. Fonts are
   self-hosted in `/fonts/`.
3. **Never rename a `p_*` field in the form POST.** `p_consent` is frozen. Renaming it broke every
   submission on this site once, silently.
4. **Palette and type are locked** in `brand-tokens.css`. Oxblood `#6E1E2A`, Ivory `#F3ECDD`,
   Ink `#14100F`, Champagne `#EFE3C0`, Silver `#C9CDD2`. Fraunces display, Inter body.
   Display sizes carry a deliberate +7.5% correction — do not remove it.
5. **Maryland only** (Montgomery and Prince George's). No investment-solicitation language, no
   social links, no testimonials, fair housing on every line.

Budget that must hold: LCP < 1.5 s · performance >= 95 · CLS 0 · JS < 2 KB · page readable with
JavaScript disabled.

## Deploy
Push to `main`; Vercel deploys to `https://da-web-six.vercel.app`.
`dofraneacquisitions.com` is assigned but intentionally not serving — **do not touch DNS.**
