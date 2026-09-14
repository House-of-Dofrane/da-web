'use client';

import { useRef, type HTMLAttributes, type ReactNode } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { cn } from '@/lib/utils';

// ParallaxSection: background layers that move slower than the foreground content, which scrolls
// at natural speed. Depth, not seasickness: the deepest layer travels `strength` px over the
// section's scroll, and each extra layer travels a fraction of that.
//
// SWAP CONTRACT. Page code only ever renders
//   <ParallaxSection mode background={...} layers={[...]}>{children}</ParallaxSection>
// A future parallax implementation (for example the GSAP component supplied with the brief) can
// replace this file's internals and keep these props, and no page code changes.
//
// mode="hero":   the section starts at the top of the page; motion runs from page top until the
//                section has scrolled out.
// mode="inline": a mid-page section; motion runs while the section crosses the viewport.
// layers:        optional extra layers stacked above `background` and below the content. `speed`
//                is a fraction of `strength` (0 = fixed to the section, 1 = as slow as the
//                background). Lower speeds read as nearer to the viewer.
// Under prefers-reduced-motion every layer renders static.

export type ParallaxLayer = { node: ReactNode; speed: number };

type ParallaxSectionProps = {
  background: ReactNode;
  layers?: ParallaxLayer[];
  children: ReactNode;
  mode?: 'hero' | 'inline';
  strength?: number;
} & Omit<HTMLAttributes<HTMLElement>, 'children'>;

function Layer({ progress, travel, mode, reduceMotion, children }: {
  progress: MotionValue<number>;
  travel: number;
  mode: 'hero' | 'inline';
  reduceMotion: boolean | null;
  children: ReactNode;
}) {
  const y = useTransform(progress, [0, 1], mode === 'hero' ? [0, travel] : [-travel / 2, travel / 2]);
  return (
    <motion.div
      aria-hidden="true"
      className="absolute inset-x-0 -top-[12%] h-[124%] will-change-transform"
      style={reduceMotion ? undefined : { y }}
    >
      {children}
    </motion.div>
  );
}

export function ParallaxSection({ background, layers = [], children, mode = 'hero', strength = 120, className, ...rest }: ParallaxSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: mode === 'hero' ? ['start start', 'end start'] : ['start end', 'end start'],
  });

  return (
    <section ref={ref} className={cn('relative isolate overflow-hidden', className)} {...rest}>
      <div className="absolute inset-0 -z-10">
        <Layer progress={scrollYProgress} travel={strength} mode={mode} reduceMotion={reduceMotion}>
          {background}
        </Layer>
        {layers.map((layer, i) => (
          <Layer key={i} progress={scrollYProgress} travel={strength * layer.speed} mode={mode} reduceMotion={reduceMotion}>
            {layer.node}
          </Layer>
        ))}
      </div>
      <div className="relative">{children}</div>
    </section>
  );
}
