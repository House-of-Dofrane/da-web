'use client';

import { useEffect, useState } from 'react';
import { LEAD_COPY } from '@/lib/lead-copy';
import { cn } from '@/lib/utils';

// Mobile-only sticky CTA, pinned to the bottom where a thumb reaches it. Appears once the hero has
// scrolled away (same hero-end marker as the desktop top bar) and hides again over the footer so it
// never covers the footer's own CTA. Tapping scrolls to the form and focuses the address field.
export function MobileCtaBar() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const heroEnd = document.getElementById('hero-end');
    const footer = document.querySelector('[data-section="footer"]');
    if (!heroEnd || !('IntersectionObserver' in window)) return;
    let pastHero = false;
    let atFooter = false;
    const update = () => setShown(pastHero && !atFooter);
    const heroIo = new IntersectionObserver(([e]) => {
      pastHero = !e.isIntersecting && e.boundingClientRect.top < 0;
      update();
    });
    heroIo.observe(heroEnd);
    let footIo: IntersectionObserver | undefined;
    if (footer) {
      footIo = new IntersectionObserver(([e]) => {
        atFooter = e.isIntersecting;
        update();
      }, { rootMargin: '0px 0px -20% 0px' });
      footIo.observe(footer);
    }
    return () => {
      heroIo.disconnect();
      footIo?.disconnect();
    };
  }, []);

  const toForm = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.getElementById('offer')?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
    window.setTimeout(
      () => document.querySelector<HTMLElement>('[data-lead-form] input:not([type=hidden])')?.focus({ preventScroll: true }),
      reduce ? 0 : 450,
    );
  };

  return (
    <div
      data-section="mobile-cta"
      aria-hidden={!shown}
      inert={!shown}
      className={cn(
        'fixed inset-x-0 bottom-0 z-40 border-t border-[color-mix(in_srgb,var(--da-ivory)_18%,var(--da-oxblood))] bg-oxblood px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none md:hidden',
        shown ? 'translate-y-0' : 'translate-y-full',
      )}
    >
      <button
        type="button"
        onClick={toForm}
        className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-gold px-6 text-base font-bold text-oxblood active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ivory"
      >
        {LEAD_COPY.cta}
      </button>
    </div>
  );
}
