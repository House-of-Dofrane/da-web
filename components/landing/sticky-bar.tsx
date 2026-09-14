'use client';

import { useEffect, useState } from 'react';
import { OfferCta } from '@/components/landing/offer-cta';
import { cn } from '@/lib/utils';

// The reference's recovery bar: hidden at load, slides in once the hero has scrolled away so the
// action stays one tap away. An IntersectionObserver on the hero's end marker drives it; there is
// no scroll listener. Slide is 300ms strong ease-out; instant under reduced motion.
export function StickyBar({ brand }: { brand: string }) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const marker = document.getElementById('hero-end');
    if (!marker || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([entry]) => setShown(!entry.isIntersecting && entry.boundingClientRect.top < 0));
    io.observe(marker);
    return () => io.disconnect();
  }, []);

  return (
    <div
      data-section="sticky"
      aria-hidden={!shown}
      inert={!shown}
      className={cn(
        'fixed inset-x-0 top-0 z-40 border-b border-border bg-background/95 backdrop-blur-md transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none',
        shown ? 'translate-y-0' : '-translate-y-full',
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <span className="text-xs font-bold uppercase tracking-[0.24em] text-foreground">{brand}</span>
        <OfferCta />
      </div>
    </div>
  );
}
