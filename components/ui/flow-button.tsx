'use client';

import type { ButtonHTMLAttributes } from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

// FlowButton, as supplied. The hover morph (pill -> 12px radius), the circle expansion and the
// two-arrow hand-off keep their exact durations, easings and positions. Ruling R5 maps the colours
// onto the DA palette (60/30/10): the hover fill is gold, text and arrows oxblood; `tone="inverted"` is gold on oxblood.
// Additions, flagged: native button props (type, disabled, onClick) so it can submit a form, a
// keyboard focus ring, and a disabled state.

type Tone = 'default' | 'inverted';

const tones: Record<Tone, { button: string; arrow: string; circle: string; focus: string }> = {
  default: {
    button: 'border-[var(--da-oxblood)]/40 text-[var(--da-oxblood)] hover:text-[var(--da-oxblood)]',
    arrow: 'stroke-[var(--da-oxblood)] group-hover:stroke-[var(--da-oxblood)]',
    circle: 'bg-[var(--da-gold)]',
    focus: 'focus-visible:outline-[var(--da-oxblood)]',
  },
  inverted: {
    button: 'border-[var(--da-gold)]/60 text-[var(--da-gold)] hover:text-[var(--da-oxblood)]',
    arrow: 'stroke-[var(--da-gold)] group-hover:stroke-[var(--da-oxblood)]',
    circle: 'bg-[var(--da-gold)]',
    focus: 'focus-visible:outline-[var(--da-gold)]',
  },
};

type FlowButtonProps = {
  text?: string;
  tone?: Tone;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'>;

export function FlowButton({ text = 'Modern Button', tone = 'default', className, type = 'button', ...props }: FlowButtonProps) {
  const t = tones[tone];
  return (
    <button
      type={type}
      className={cn(
        'group relative flex items-center gap-1 overflow-hidden rounded-[100px] border-[1.5px] bg-transparent px-8 py-3 text-sm font-semibold cursor-pointer transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-transparent hover:rounded-[12px] active:scale-[0.95]',
        'focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-60',
        t.button,
        t.focus,
        className,
      )}
      {...props}
    >
      {/* Left arrow (arr-2) */}
      <ArrowRight
        aria-hidden="true"
        className={cn('absolute w-4 h-4 left-[-25%] fill-none z-[9] group-hover:left-4 transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]', t.arrow)}
      />

      {/* Text */}
      <span className="relative z-[1] -translate-x-3 group-hover:translate-x-3 transition-all duration-[800ms] ease-out">
        {text}
      </span>

      {/* Circle */}
      <span
        aria-hidden="true"
        className={cn('absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-[50%] opacity-0 group-hover:w-[220px] group-hover:h-[220px] group-hover:opacity-100 transition-all duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)]', t.circle)}
      ></span>

      {/* Right arrow (arr-1) */}
      <ArrowRight
        aria-hidden="true"
        className={cn('absolute w-4 h-4 right-4 fill-none z-[9] group-hover:right-[-25%] transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]', t.arrow)}
      />
    </button>
  );
}
