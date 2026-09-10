-- HANDOFF TO THE WHOLESALE DESK. NOT APPLIED, AND NOT MINE TO APPLY.
-- wholesale.* belongs to the desk. This is a proposal for review in HOD_WHOLESALE.
--
-- WHY IT EXISTS
-- The v2 landing page captures front tracking (gclid, utm, referrer, landing path, first touch)
-- and the exact consent sentence with its timestamp. It cannot send any of it, because PostgREST
-- resolves an RPC by ARGUMENT NAME: adding p_gclid to the body against today's 12-argument function
-- returns PGRST202 and fails silently in the browser. That has already cost every submission on
-- this site once. Until this lands, the page rides all of it inside p_condition as one labelled
-- "[attr] ..." line, which ends up in wholesale.sellers.notes.
--
-- WHAT THIS REPLACES
-- HOD_WHOLESALE/migrations/2026-09-09_inbound_attribution_and_consent.sql declares the right 18
-- arguments but its BODY RAISES:
--   raise exception 'inbound_submit: staged signature only. ...'
-- Applying that file as written breaks every submission. This file carries the real body.
--
-- THE HAZARD THAT FILE DOES NOT MENTION
-- create-or-replace with 18 arguments does NOT replace the 12-argument function. It creates a
-- SECOND function, and PostgREST then answers every call with
--   "Could not choose the best candidate function between ..."
-- Both must exist and not-exist atomically, so the drop is in this transaction. Everything below
-- runs as one unit or not at all.
--
-- FROZEN: p_consent keeps its name. p_consent_text is ADDED alongside it, never a rename.

begin;

alter table wholesale.deals
  add column if not exists market              text,
  add column if not exists niche               text,
  add column if not exists acquisition_cost_usd numeric(10,2),
  add column if not exists gclid               text,
  add column if not exists utm                 jsonb not null default '{}'::jsonb,
  add column if not exists landing_page        text,
  add column if not exists referrer            text,
  add column if not exists first_touch_at      timestamptz;

alter table wholesale.sellers
  add column if not exists consent_text      boolean not null default false,
  add column if not exists consent_text_note text,
  add column if not exists consent_ip        inet,
  add column if not exists consent_page      text;

create index if not exists deals_gclid_idx on wholesale.deals (gclid) where gclid is not null;
create index if not exists deals_utm_idx   on wholesale.deals using gin (utm);

create or replace function public.inbound_submit(
  p_name text default '', p_phone text default '', p_email text default '',
  p_address text default '', p_city text default '', p_state text default '',
  p_zip text default '', p_condition text default '', p_timeline text default '',
  p_need text default '', p_consent boolean default false, p_website text default '',
  -- added 2026-09-09, all defaulted so a 12-argument caller still resolves
  p_consent_text boolean default false, p_consent_shown text default null,
  p_page text default null, p_market text default null, p_niche text default null,
  p_gclid text default null, p_utm jsonb default '{}'::jsonb,
  p_referrer text default null, p_first_touch_at timestamptz default null
) returns jsonb
language plpgsql security definer set search_path = wholesale, public
as $fn$
declare
  v_state  text;
  v_phone  text;
  v_seller uuid;
  v_deal   uuid;
  v_ip     inet;
begin
  -- 1. honeypot: look successful, write nothing
  if coalesce(p_website,'') <> '' then return jsonb_build_object('ok', true); end if;

  v_state := nullif(upper(left(coalesce(p_state,''),2)),'');

  if coalesce(p_address,'') = ''
     or (coalesce(p_phone,'') = '' and coalesce(p_email,'') = '') then
    return jsonb_build_object('ok', false, 'error', 'address and a phone or email are required');
  end if;
  if v_state is null then
    return jsonb_build_object('ok', false, 'error', 'state is required');
  end if;
  if not p_consent then
    return jsonb_build_object('ok', false, 'error',
      'please tick the box giving us permission to contact you');
  end if;

  v_phone := regexp_replace(coalesce(p_phone,''), '[^0-9+]', '', 'g');

  -- rate limit, unchanged
  if (select count(*) from wholesale.sellers
       where source = 'inbound' and created_at > now() - interval '1 hour') >= 20 then
    return jsonb_build_object('ok', false, 'error', 'try again later');
  end if;

  -- The client IP is NOT inet_client_addr() here: that is the PostgREST server. The browser's
  -- address arrives in the forwarded header. TCPA wants the address the consent came from.
  begin
    v_ip := split_part(current_setting('request.headers', true)::json->>'x-forwarded-for', ',', 1)::inet;
  exception when others then v_ip := null;
  end;

  insert into wholesale.sellers
    (name, phone, email, mailing_address, owner_type, motivation_signals,
     consent, consent_note, consent_text, consent_text_note, consent_ip, consent_page,
     source, channel, channel_key, notes)
  values
    (left(coalesce(p_name,''),120), v_phone, left(coalesce(p_email,''),200),
     left(coalesce(p_address,'') || ', ' || coalesce(p_city,'') || ' ' || v_state
          || ' ' || coalesce(p_zip,''), 300),
     'owner',
     array_remove(array[nullif(p_timeline,''), nullif(p_need,'')], null),
     'written'::wholesale.consent,
     -- FIXED (G02): the page is recorded, not hardcoded. v1 wrote
     -- 'web form houseofdofrane.com/sell' onto every submission regardless of origin.
     coalesce(p_consent_shown, 'consent box ticked')
       || ' | page=' || coalesce(p_page, 'unknown')
       || ' | at='   || now()::text,
     -- FIXED (G03): the SMS box was rendered, ticked by real people, and dropped before the wire.
     coalesce(p_consent_text, false),
     case when coalesce(p_consent_text,false) then p_consent_shown else null end,
     v_ip, p_page,
     'inbound', 'inbound_form', 'inbound', left(coalesce(p_condition,''),500))
  returning id into v_seller;

  insert into wholesale.deals
    (address, city, state, zip, submarket, stage, stage_changed_at, source, seller_id,
     channel, channel_key, notes,
     market, niche, gclid, utm, landing_page, referrer, first_touch_at)
  values
    (left(coalesce(p_address,''),200), left(coalesce(p_city,''),80), v_state,
     left(coalesce(p_zip,''),10), 'inbound_unassigned', 'sourced', now(), 'inbound', v_seller,
     'inbound_form', 'inbound',
     'inbound: ' || coalesce(p_need,'') || ' · ' || coalesce(p_timeline,''),
     p_market, p_niche, nullif(p_gclid,''), coalesce(p_utm,'{}'::jsonb),
     p_page, nullif(p_referrer,''), p_first_touch_at)
  returning id into v_deal;

  return jsonb_build_object('ok', true, 'deal_id', v_deal);
end;
$fn$;

-- Atomic with the create above. Leaving the 12-argument function in place makes PostgREST
-- refuse to choose between the two candidates and every submission fails.
drop function if exists public.inbound_submit(
  text,text,text,text,text,text,text,text,text,text,boolean,text);

revoke all on function public.inbound_submit(
  text,text,text,text,text,text,text,text,text,text,boolean,text,
  boolean,text,text,text,text,text,jsonb,text,timestamptz) from public;
grant execute on function public.inbound_submit(
  text,text,text,text,text,text,text,text,text,text,boolean,text,
  boolean,text,text,text,text,text,jsonb,text,timestamptz) to anon, authenticated;

commit;

-- ACCEPTANCE, RUN AS anon BEFORE THIS IS CALLED DONE
--   1. A 12-argument POST still returns {"ok":true,"deal_id":...}. Old callers must not break.
--   2. An 18-argument POST lands gclid, utm and first_touch_at on the deal row.
--   3. p_website non-empty returns ok:true and writes nothing.
--   4. p_consent false returns ok:false with the tick-the-box message, at HTTP 200.
--   5. consent_ip is populated from x-forwarded-for, not null and not the PostgREST address.
--   6. Delete every test row afterwards.
