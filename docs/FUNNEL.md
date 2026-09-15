# Landing-page tracking funnel

Every funnel step fires to **two sinks**, analytics-consent-gated, fire-and-forget:
1. **Vercel Analytics** custom events (the dashboard funnel).
2. **`wholesale.funnel_events`** via `/api/track` → `public.record_funnel_event` (owned, durable, queryable, joinable). Optional fan-out to `FUNNEL_WEBHOOK_URL`.

Anonymous only: a random per-browser `session_id` (localStorage `da_sid`), an event name, the path, small meta. No PII.

## Events (the funnel, in order)
| Event | Fires when | Stage |
|---|---|---|
| *(page view)* | any visit | Vercel Analytics (automatic) |
| `offer_cta_click` | any "Get Cash Offer" outside the form (hero / section / footer / desktop sticky) — `meta.where` | Interest |
| `mobile_cta_click` | the mobile sticky bar CTA | Interest |
| `form_start` | first focus inside the lead form | Engagement |
| `lead_submit_attempt` | final step submitted | Intent |
| `lead_submitted` | lead stored OK — **conversion** (`meta.zip`) | Conversion |
| `lead_failed` | submit failed (`meta.reason` = server \| network) | Drop |
| `book_a_call_click` | the Book-a-Call button opens Calendly | Secondary path |

## Read the funnel (owned data)
```sql
-- Step counts, last 7 days
select event, count(*) as events, count(distinct session_id) as sessions
from wholesale.funnel_events
where at > now() - interval '7 days'
group by event order by events desc;

-- Interest -> engagement -> conversion, unique sessions
select
  count(distinct session_id) filter (where event in ('offer_cta_click','mobile_cta_click')) as cta,
  count(distinct session_id) filter (where event = 'form_start')                            as started,
  count(distinct session_id) filter (where event = 'lead_submitted')                        as converted
from wholesale.funnel_events
where at > now() - interval '7 days';
```
Pair the page-view total (Vercel dashboard) with `cta` above for view→CTA rate; the rest is owned in `funnel_events`.

## Status
- Table + RPC: **applied, live**. `/api/track`: **built, end-to-end verified** (write + junk rejection).
- Instrumentation: **live** across CTAs, form, and Book-a-Call.
- Gating: fires only after the visitor accepts the cookie banner's **analytics** category.
- Optional: set `FUNNEL_WEBHOOK_URL` on Vercel to also stream every event to an external sink (n8n/Zapier/Make/Telegram relay).
