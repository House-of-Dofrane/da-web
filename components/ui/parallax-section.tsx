'use client';

import { useRef, type HTMLAttributes, type ReactNode } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

// ParallaxSection: a slower background layer behind foreground content that scrolls at natural
// speed. Depth, not seasickness: the background travels `strength` px over the section's scroll.
//
// SWAP CONTRACT. Page code only ever renders
//   <ParallaxSection mode background={...}>{children}</ParallaxSection>
// A future parallax implementation (for example the GSAP component supplied with the brief) can
// replace this file's internals and keep these props, and no page code changes.
//
// mode="hero":   the section starts at the top of the page; motion runs from page top until the
//                section has scrolled out.
// mode="inline": a mid-page section; motion runs while the section crosses the viewport.
// Under prefers-reduced-motion both modes render static.

type ParallaxSectionProps = {
  background: ReactNode;
  children: ReactNode;
  mode?: 'hero' | 'inline';
  strength?: number;
} & Omit<HTMLAttributes<HTMLElement>, 'children'>;

export function ParallaxSection({ background, children, mode = 'hero', strength = 120, className, ...rest }: ParallaxSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: mode === 'hero' ? ['start start', 'end start'] : ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], mode === 'hero' ? [0, strength] : [-strength / 2, strength / 2]);

  return (
    <section ref={ref} className={cn('relative isolate overflow-hidden', className)} {...rest}>
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 -top-[12%] -z-10 h-[124%] will-change-transform"
        style={reduceMotion ? undefined : { y }}
      >
        {background}
      </motion.div>
      <div className="relative">{children}</div>
    </section>
  );
}
