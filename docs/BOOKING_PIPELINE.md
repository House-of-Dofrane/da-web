# Book-a-Call pipeline — wiring & status

Non-urgent seller calls, kept fully separate from the urgent seller pipeline.

## Flow
```
Book a Call (landing)  ->  Calendly popup (branded)  ->  invitee booked
   -> Calendly webhook (invitee.created / .canceled)
      -> POST /api/calendly-webhook   [verifies Calendly signature]
         -> public.record_call_booking(jsonb)  [SECURITY DEFINER]
            -> wholesale.call_bookings          [idempotent on calendly_event_id]
         -> notifyCallBooking()  ->  CALL_NOTIFY_WEBHOOK_URL relay  ->  Telegram card to the rep
```
First-party glue (a Next.js route), not n8n/Zapier — no extra service, no duplicated form logic.

## Built & verified (in this repo / DB)
- `wholesale.call_bookings` table + RLS (seat_all, da_readonly_ro). **Applied, live.**
- `public.record_call_booking(jsonb)` SECURITY DEFINER RPC. **Applied; insert + idempotent upsert tested.**
- `app/api/calendly-webhook/route.ts` — signature-verified receiver. **Builds; registered.**
- `lib/calendly.ts` (signature + payload mapping) — **17 unit tests pass** (`scripts/calendly.test.mjs`).
- `lib/notify-call.ts` — privacy-lean rep notification relay.

## Env to set on Vercel (nothing here holds a secret)
| Var | Purpose | Have it? |
|---|---|---|
| `CALENDLY_WEBHOOK_SIGNING_KEY` | verify Calendly webhooks | ❌ from the Calendly webhook subscription |
| `SUPABASE_URL` | already set (lead path) | ✅ |
| `SUPABASE_PUBLISHABLE_KEY` | already set (lead path) | ✅ |
| `CALL_NOTIFY_WEBHOOK_URL` | relay → Telegram rep card (falls back to `LEAD_NOTIFY_WEBHOOK_URL`) | ❌ |
| `NEXT_PUBLIC` Calendly URL → `CALENDLY_URL` in `lib/site-config.ts` | lights up the Book-a-Call button | ❌ from the Calendly event |

## Still needs a person (accounts/logins — not code)
1. **Calendly event** — round-robin SWX + ALO, brand colors, and two required custom questions:
   a select "reason for the call" (General question · Exploring my options · I have an offer to compare · Other),
   and a **mandatory** free-text "What would you like us to know before the call?". Set the recording/transcription
   notice on the confirmation page + reminder email (Maryland is two-party consent).
   Then paste the event link into `CALENDLY_URL` and register the webhook (→ `CALENDLY_WEBHOOK_SIGNING_KEY`).
2. **Business emails** for both hosts (round-robin needs two connected calendars).
3. **Fireflies** joined to the video platform Calendly books (Zoom/Meet) for auto-transcription.
4. **The relay** behind `CALL_NOTIFY_WEBHOOK_URL` that posts the Telegram card to the assigned rep.

The moment #1's link + signing key are set, a real prospect can book and the row + notification fire.
