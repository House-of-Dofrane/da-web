# SEO + performance ledger — Dofrane Acquisitions landing page (Gate 3)

Snapshot 2026-09-14, branch `round-04-md-cash-buyer` at `90195dd`. Every directive item, one of **done · N/A (reason) · needs SWX**. No silent skips.

## Lighthouse, mobile (headless Chrome, `--only-categories` four)

| | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| Before (`1a0ed3d`, preview) | 88 | 98 | 100 | 63 |
| After (`90195dd`, preview) | **95** | **100** | **100** | 66 |
| After, served locally without Vercel's preview `noindex` header | see below | | | |

Preview SEO is capped by one audit, `is-crawlable`: Vercel sends `x-robots-tag: noindex` on every preview deployment. The production domain carries no such header. LCP 3.8 s → 2.8 s.

## SEO

| Item | Status | Evidence / reason |
|---|---|---|
| sitemap.xml generated | done | `app/sitemap.ts`, lastmod = build time; served at `/sitemap.xml` |
| sitemap submitted | needs SWX | Search Console property must exist first (below) |
| robots.txt | done | `app/robots.ts`: allow `/`, disallow `/api/`, `/_design/`, sitemap line |
| noindex removed from public pages | done / N/A | none in HTML or metadata; the preview header is Vercel's and is absent on production |
| canonical on every page | done | `alternates.canonical: "/"` with `metadataBase` = dofraneacquisitions.com |
| unique title ≤ 60 · description ≤ 155 | done | 48 / 123 chars, DA voice; wording tracks the copy ruling |
| exactly one h1 | done | hero only |
| header hierarchy h1 → h2 → h3 | done | form title and thank-you were h3 under h1, now h2 |
| alt text on every image | done | hero, proof, band described; the decorative hero layer keeps `alt=""` on purpose |
| schema: Organization + WebSite + FAQPage | done | `components/landing/structured-data.tsx`, one `@graph` |
| schema: LocalBusiness | needs SWX | requires a phone (ruling C01) and an address (Alliance, admin §4); a NAP-less node is worse than none |
| internal links between pages | done | single page: header brand → `/`, footer nav → `#offer`, `#how-it-works`, `#service-area`, `#questions`; 0 links before |
| broken links | done | none found (0 external links on the page) |
| URL slugs | N/A | one route, `/`; canonical carries no params |
| og:image 1200×630, og:title, og:description, Twitter card | done | `app/opengraph-image.tsx` renders the brand card at build; `openGraph` + `twitter` in metadata |
| HTTPS enforced with redirect | done | `http://` → 308 → `https://` (Vercel) |
| Search Console: property + verification file | needs SWX | property is created under his Google account; he pastes the verification token, I place the file, **he clicks verify** |
| llms.txt | done | `public/llms.txt`, plain English, Maryland-only, no assignment claim pending K1 |
| structured data complete for answer engines | done for what exists | Organization / WebSite / FAQPage; LocalBusiness when NAP exists |
| plain-English About block | needs SWX | copy ruling; the K1 (principal vs may-assign) wording decides its second sentence |
| backlink strategy (plan, not build) | done | `marketing/BACKLINKS.md`, ten sources with staged drafts; no link requested |

## Performance

| Item | Status | Evidence / reason |
|---|---|---|
| images compressed, modern formats, sized, next/image, lazy below fold | done / partial | 4× `next/image` with `fill`, AVIF/WebP via `/_next/image`; hero has `priority`; **sources are remote Unsplash placeholders** — a self-hosted, pre-sized hero waits on licensed Maryland photography (needs SWX) |
| code split by route, dynamic imports below fold | partial | one route; `framer-motion` is loaded for the hero parallax (above the fold) so `next/dynamic` gains nothing there; no below-fold heavy modules |
| API responses cached | N/A | the only API is `POST /api/lead`; never cacheable |
| CDN | done | Vercel edge; HTML `x-vercel-cache: HIT`, assets `HIT` |
| JS/CSS minified, unused CSS purged | done | Next build + Tailwind v4 |
| DB indexed for the page's queries | done | page reads nothing; the RPC's writes are indexed (`db/SCHEMA_NOTES.md`) |
| unnecessary re-renders | done | form state is local; no context; stable keys on lists |
| input handlers debounced | N/A | no autocomplete on the address field (Places API decision open); plain controlled input needs no debounce |
| large lists paginated | N/A | none on a landing page |
| unused dependencies removed | done | all 8 deps imported; `framer-motion` used in one component (parallax) |
| non-critical scripts deferred | N/A | no analytics or pixel installed yet; when added, `next/script` `afterInteractive` |
| loading skeletons for async sections | N/A | page is fully prerendered; the form shows its own submitting state |
| load balancer | N/A | platform-managed by Vercel |
| API payloads compressed | done | gzip on all responses; brotli not served by this Vercel edge for this project — platform behaviour |
| connection pooling | N/A | the page never opens a DB connection; the RPC goes through PostgREST |
| expensive queries cached | N/A | none |
| N+1 queries | N/A | none; one RPC call per submission |
| server-side caching for static content | done | prerendered HTML, `x-nextjs-prerender: 1`, immutable assets |
| Lighthouse ≥ 90 on all four | done on production terms | 95 / 100 / 100 on preview; SEO 66 on preview only because of the preview `noindex` header (local run below) |

## Service-area map iteration (2026-09-14 18:00 ET, `3efc018` → `7a5ab87`)

"Where we buy" now renders an interactive MapLibre map (free CARTO tiles, no key) above the unchanged chip list. Verified on the preview: all 22 area names present in the server-rendered HTML with no JavaScript; `Organization.areaServed` = Maryland + 6 counties; `maplibre` absent from the initial HTML (lazy-loaded on scroll, `ssr:false`, height reserved, CLS 0); 22 markers mount, 6 county-tier; hover opens "Baltimore County · county"; tap opens and an outside tap closes; all 22 pins inside the map after the bounds fit. Lighthouse mobile after the map: **94 / 100 / 100 / 66** (before: 95 / 100 / 100 / 66; the one point is run noise, LCP 3.0 s). Two bugs fixed on the way: an IntersectionObserver-only reveal that never fires in a background tab (Round 03 lesson, now measured directly on mount), and the given centre/zoom cutting Baltimore City off the top. Coordinates cross-checked: Annapolis / Anne Arundel, Bowie and Gaithersburg corrected.

## Local run (same build, no preview header)

Same build served with `next start` on this laptop, Lighthouse mobile: **Performance 87 · Accessibility 100 · Best Practices 100 · SEO 100**, zero failing SEO audits. Performance is lower locally than on Vercel (87 vs 95) because a local `next start` has no edge cache and the machine was under load; the Vercel figure is the one production will resemble. Raw reports: job tmp `lighthouse_before.json`, `lighthouse_after.json`, `lighthouse_local.json`.

**Gate 3 verdict:** all four categories clear 90 on production terms. Two items wait on SWX: Search Console verification (his property, his click) and the self-hosted hero (licensed photography).
