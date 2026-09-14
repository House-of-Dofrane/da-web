'use client';

import { FlowButton } from '@/components/ui/flow-button';
import { LEAD_COPY } from '@/lib/lead-copy';

// Every "Get Cash Offer" outside the form: scrolls the form into view and puts the cursor in the
// address field, so the seller lands on step 1 ready to type.
export function OfferCta({ tone = 'default', className }: { tone?: 'default' | 'inverted'; className?: string }) {
  return (
    <FlowButton
      text={LEAD_COPY.cta}
      tone={tone}
      className={className}
      onClick={() => {
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        document.getElementById('offer')?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
        window.setTimeout(
          () => document.querySelector<HTMLElement>('[data-lead-form] input:not([type=hidden])')?.focus({ preventScroll: true }),
          reduce ? 0 : 450,
        );
      }}
    />
  );
}
