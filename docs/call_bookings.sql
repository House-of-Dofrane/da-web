-- call_bookings — non-urgent "book a call" inquiries from the DA landing page.
-- DELIBERATELY SEPARATE from wholesale.sellers: these are cold, non-urgent inquiries, NOT the
-- DNC-scrubbed urgent seller pipeline, and must not be merged or scored the same way.
--
-- STATUS: APPLIED 2026-09-14 to Finance Core `fdjnkqrqkmsdibehcbuq`, schema `wholesale`, via the
-- migrations create_wholesale_call_bookings + create_record_call_booking_rpc. RLS on; policies
-- seat_all (hod_wholesale ALL) + da_readonly_ro (SELECT), matching the schema convention. The write
-- path is public.record_call_booking(jsonb) (SECURITY DEFINER), verified end-to-end (insert +
-- idempotent upsert on calendly_event_id). This file is the reference copy of that DDL.

create table if not exists wholesale.call_bookings (
  id                          uuid primary key default gen_random_uuid(),
  name                        text,
  email                       text,
  phone                       text,
  reason                      text,               -- select value; 'other' free text captured below
  reason_other                text,
  agenda_note                 text not null,      -- the mandatory "what should we know" field
  assigned_rep                text,               -- 'SWX' | 'ALO' | round-robin result
  calendly_event_id           text unique,        -- idempotency key from the webhook
  calendly_event_link         text,
  scheduled_at                timestamptz,
  status                      text not null default 'scheduled',  -- scheduled|completed|canceled|no_show
  recording_consent_disclosed boolean not null default false,
  created_at                  timestamptz not null default now()
);

comment on table wholesale.call_bookings is
  'Non-urgent Book-a-Call inquiries (Calendly). Separate from wholesale.sellers by design.';

alter table wholesale.call_bookings enable row level security;

-- Writes come only from the trusted webhook path (service role / da_writer), never the browser.
-- No anon/public policy — the landing page never writes here directly.
-- grant insert, select on wholesale.call_bookings to <webhook_role>;
