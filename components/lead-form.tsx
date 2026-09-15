'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { trackFunnel } from '@/lib/track';
import { FlowButton } from '@/components/ui/flow-button';
import { captureAttribution } from '@/lib/attribution';
import { CONSENT_TEXT, CONSENT_TEXT_SMS, LEAD_COPY } from '@/lib/lead-copy';
import { CONDITIONS, OCCUPANCY, STEPS, TIMELINES, type Attribution } from '@/lib/lead-schema';
import { cn } from '@/lib/utils';

type Values = {
  address: string;
  zip: string;
  condition: string;
  occupancy: string;
  timeline: string;
  name: string;
  phone: string;
  email: string;
  consent: boolean;
  consentText: boolean;
  website: string;
};

type Field = keyof Values;
type Errors = Partial<Record<Field, string>>;
type Status = 'editing' | 'sending' | 'done' | 'failed';

const INITIAL: Values = {
  address: '',
  zip: '',
  condition: '',
  occupancy: '',
  timeline: '',
  name: '',
  phone: '',
  email: '',
  consent: false,
  consentText: false,
  website: '',
};

// Which step owns each field, so a server-side error can send the seller back to the right step.
const STEP_OF: Record<Field, number> = {
  address: 0,
  zip: 0,
  condition: 1,
  occupancy: 1,
  timeline: 1,
  name: 2,
  phone: 2,
  email: 2,
  consent: 2,
  consentText: 2,
  website: 2,
};

const inputClass =
  'h-12 w-full rounded-lg border border-input bg-[color-mix(in_srgb,#fff_78%,var(--da-ivory))] px-3.5 text-base text-foreground placeholder:text-muted-foreground transition-[border-color,box-shadow] duration-150 focus-visible:border-[var(--da-oxblood)] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[var(--da-oxblood)]/20 aria-invalid:border-[var(--da-oxblood)]';

export function LeadForm({ className }: { className?: string }) {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<Values>(INITIAL);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('editing');
  const attribution = useRef<Attribution>({});
  const stepRef = useRef<HTMLDivElement>(null);
  const movedRef = useRef(false);
  const startedRef = useRef(false);

  // First interaction with the form = the seller entered the funnel's engagement stage. Fire once.
  function onFirstInteraction() {
    if (startedRef.current) return;
    startedRef.current = true;
    trackFunnel('form_start');
  }

  useEffect(() => {
    attribution.current = captureAttribution();
  }, []);

  // Move focus to the first control of a new step, but never on first render.
  useEffect(() => {
    if (!movedRef.current) return;
    stepRef.current?.querySelector<HTMLElement>('input:not([type=hidden]), select, textarea')?.focus();
  }, [step]);

  const total = STEPS.length;
  const copy = LEAD_COPY.steps[step];

  function set<K extends Field>(key: K, value: Values[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function focusField(key: string) {
    requestAnimationFrame(() => {
      document.querySelector<HTMLElement>(`[data-lead-form] [name="${key}"]`)?.focus();
    });
  }

  function validateStep(index: number): boolean {
    const result = STEPS[index].safeParse(values);
    if (result.success) {
      setErrors({});
      return true;
    }
    const next: Errors = {};
    for (const issue of result.error.issues) {
      const key = issue.path[0] as Field;
      if (!next[key]) next[key] = issue.message;
    }
    setErrors(next);
    focusField(Object.keys(next)[0]);
    return false;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === 'sending') return;
    if (!validateStep(step)) return;

    if (step < total - 1) {
      movedRef.current = true;
      setStep(step + 1);
      return;
    }

    setStatus('sending');
    trackFunnel('lead_submit_attempt');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, attribution: attribution.current }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; issues?: { path: string; message: string }[] };
      if (res.ok && data.ok) {
        setStatus('done');
        // Conversion event (no PII: the ZIP's market bucket only).
        trackFunnel('lead_submitted', { zip: values.zip });
        return;
      }
      if (res.status === 422 && Array.isArray(data.issues) && data.issues.length > 0) {
        const next: Errors = {};
        for (const issue of data.issues) {
          const key = issue.path.split('.')[0] as Field;
          if (key in STEP_OF && !next[key]) next[key] = issue.message;
        }
        const firstKey = Object.keys(next)[0] as Field | undefined;
        setErrors(next);
        setStatus('editing');
        if (firstKey) {
          setStep(STEP_OF[firstKey]);
          focusField(firstKey);
        }
        return;
      }
      setStatus('failed');
      trackFunnel('lead_failed', { reason: 'server' });
    } catch {
      setStatus('failed');
      trackFunnel('lead_failed', { reason: 'network' });
    }
  }

  if (status === 'done') {
    return (
      <div className={cn('rounded-2xl bg-card p-6 sm:p-8', className)} role="status" aria-live="polite">
        <h2 className="text-xl font-bold tracking-tight text-foreground">{LEAD_COPY.thanks.title}</h2>
        <p className="mt-2 text-base text-muted-foreground">{LEAD_COPY.thanks.body}</p>
      </div>
    );
  }

  const describedBy = (key: Field) => (errors[key] ? `lead-${key}-error` : undefined);

  const errorText = (key: Field) =>
    errors[key] ? (
      <p id={`lead-${key}-error`} className="mt-1.5 text-sm font-medium text-[var(--da-oxblood)]">
        {errors[key]}
      </p>
    ) : null;

  const choice = (key: 'condition' | 'occupancy' | 'timeline', options: readonly string[]) => (
    <fieldset aria-invalid={Boolean(errors[key])} aria-describedby={describedBy(key)}>
      <legend className="mb-2 text-sm font-medium text-muted-foreground">{LEAD_COPY.fields[key].label}</legend>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {options.map((option) => {
          const checked = values[key] === option;
          return (
            <label
              key={option}
              className={cn(
                'flex min-h-12 cursor-pointer items-center gap-3 rounded-lg border px-3.5 py-2.5 text-base transition-[border-color,background-color] duration-150',
                checked
                  ? 'border-[var(--da-gold-ink)] bg-[var(--da-gold-tint)] text-foreground'
                  : 'border-input bg-[color-mix(in_srgb,#fff_78%,var(--da-ivory))] text-foreground hover:border-[var(--da-oxblood)]/60',
              )}
            >
              <input
                type="radio"
                name={key}
                value={option}
                checked={checked}
                onChange={() => set(key, option)}
                className="size-4 accent-[var(--da-gold-ink)]"
              />
              {(LEAD_COPY.options[key] as Record<string, string>)[option]}
            </label>
          );
        })}
      </div>
      {errorText(key)}
    </fieldset>
  );

  return (
    <form
      data-lead-form
      noValidate
      onSubmit={onSubmit}
      onFocusCapture={onFirstInteraction}
      className={cn('rounded-2xl bg-card p-5 text-foreground sm:p-7', className)}
    >
      <div className="mb-5">
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          <span>{LEAD_COPY.progress(step + 1, total)}</span>
        </div>
        <div
          className="mt-2 grid grid-cols-3 gap-1.5"
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={total}
          aria-valuenow={step + 1}
          aria-label={LEAD_COPY.progress(step + 1, total)}
        >
          {STEPS.map((_, i) => (
            <span
              key={i}
              className={cn(
                'h-1.5 rounded-full transition-colors duration-300',
                i <= step ? 'bg-[var(--da-gold-ink)]' : 'bg-[color-mix(in_srgb,var(--da-oxblood)_16%,var(--da-ivory))]',
              )}
            />
          ))}
        </div>
      </div>

      <h2 className="text-xl font-bold tracking-tight">{copy.title}</h2>
      <p className="mt-1 text-sm text-muted-foreground">{copy.hint}</p>

      <div ref={stepRef} className="mt-5 grid gap-4">
        {step === 0 && (
          <>
            <div>
              <label htmlFor="lead-address" className="mb-1.5 block text-sm font-medium text-muted-foreground">
                {LEAD_COPY.fields.address.label}
              </label>
              <input
                id="lead-address"
                name="address"
                type="text"
                autoComplete="street-address"
                enterKeyHint="next"
                placeholder={LEAD_COPY.fields.address.placeholder}
                value={values.address}
                onChange={(e) => set('address', e.target.value)}
                aria-invalid={Boolean(errors.address)}
                aria-describedby={describedBy('address')}
                className={inputClass}
              />
              {errorText('address')}
            </div>
            <div className="grid grid-cols-[1fr_auto] items-start gap-3">
              <div>
                <label htmlFor="lead-zip" className="mb-1.5 block text-sm font-medium text-muted-foreground">
                  {LEAD_COPY.fields.zip.label}
                </label>
                <input
                  id="lead-zip"
                  name="zip"
                  type="text"
                  inputMode="numeric"
                  autoComplete="postal-code"
                  maxLength={5}
                  placeholder={LEAD_COPY.fields.zip.placeholder}
                  value={values.zip}
                  onChange={(e) => set('zip', e.target.value)}
                  aria-invalid={Boolean(errors.zip)}
                  aria-describedby={describedBy('zip')}
                  className={inputClass}
                />
                {errorText('zip')}
              </div>
              <div>
                <span className="mb-1.5 block text-sm font-medium text-muted-foreground">State</span>
                <span className="flex h-12 items-center rounded-lg border border-input bg-[var(--da-ivory-alt)] px-3.5 text-base font-semibold">
                  MD
                </span>
              </div>
            </div>
          </>
        )}

        {step === 1 && (
          <>
            {choice('condition', CONDITIONS)}
            {choice('occupancy', OCCUPANCY)}
            {choice('timeline', TIMELINES)}
          </>
        )}

        {step === 2 && (
          <>
            <div>
              <label htmlFor="lead-name" className="mb-1.5 block text-sm font-medium text-muted-foreground">
                {LEAD_COPY.fields.name.label}
              </label>
              <input
                id="lead-name"
                name="name"
                type="text"
                autoComplete="name"
                value={values.name}
                onChange={(e) => set('name', e.target.value)}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={describedBy('name')}
                className={inputClass}
              />
              {errorText('name')}
            </div>
            <div>
              <label htmlFor="lead-phone" className="mb-1.5 block text-sm font-medium text-muted-foreground">
                {LEAD_COPY.fields.phone.label}
              </label>
              <input
                id="lead-phone"
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder={LEAD_COPY.fields.phone.placeholder}
                value={values.phone}
                onChange={(e) => set('phone', e.target.value)}
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={describedBy('phone')}
                className={inputClass}
              />
              {errorText('phone')}
            </div>
            <div>
              <label htmlFor="lead-email" className="mb-1.5 block text-sm font-medium text-muted-foreground">
                {LEAD_COPY.fields.email.label}
              </label>
              <input
                id="lead-email"
                name="email"
                type="email"
                autoComplete="email"
                value={values.email}
                onChange={(e) => set('email', e.target.value)}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={describedBy('email')}
                className={inputClass}
              />
              {errorText('email')}
            </div>
            <div>
              <label htmlFor="lead-consent" className="flex items-start gap-3 text-sm leading-relaxed text-foreground">
                <input
                  id="lead-consent"
                  name="consent"
                  type="checkbox"
                  checked={values.consent}
                  onChange={(e) => set('consent', e.target.checked)}
                  aria-invalid={Boolean(errors.consent)}
                  aria-describedby={describedBy('consent')}
                  className="mt-0.5 size-4 shrink-0 accent-[var(--da-gold-ink)]"
                />
                <span>{CONSENT_TEXT}</span>
              </label>
              {errorText('consent')}
            </div>
            <div>
              <label htmlFor="lead-consent-text" className="flex items-start gap-3 text-xs leading-relaxed text-muted-foreground">
                <input
                  id="lead-consent-text"
                  name="consentText"
                  type="checkbox"
                  checked={values.consentText}
                  onChange={(e) => set('consentText', e.target.checked)}
                  className="mt-0.5 size-4 shrink-0 accent-[var(--da-gold-ink)]"
                />
                <span>{CONSENT_TEXT_SMS}</span>
              </label>
            </div>
          </>
        )}

        {/* Honeypot. A filled value makes inbound_submit answer ok and write nothing. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label>
            Website
            <input name="website" type="text" tabIndex={-1} autoComplete="off" value={values.website} onChange={(e) => set('website', e.target.value)} />
          </label>
        </div>
      </div>

      <div className="mt-6 flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
        {step > 0 ? (
          <button
            type="button"
            onClick={() => {
              movedRef.current = true;
              setErrors({});
              setStep(step - 1);
            }}
            className="h-11 rounded-full px-4 text-sm font-semibold text-muted-foreground underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--da-oxblood)]"
          >
            {LEAD_COPY.back}
          </button>
        ) : (
          <span />
        )}
        <FlowButton
          type="submit"
          text={status === 'sending' ? LEAD_COPY.sending : LEAD_COPY.cta}
          disabled={status === 'sending'}
          className="w-full justify-center sm:w-auto"
        />
      </div>

      <p className="mt-3 min-h-5 text-sm font-medium text-[var(--da-oxblood)]" role="status" aria-live="polite">
        {status === 'failed' ? LEAD_COPY.failed : ''}
      </p>
    </form>
  );
}
