import Image from 'next/image';
import type { ReactNode } from 'react';
import {
  Building2,
  CalendarCheck,
  Check,
  ChevronDown,
  CircleDollarSign,
  FileText,
  Hammer,
  KeyRound,
  MapPin,
  Truck,
} from 'lucide-react';
import { LeadForm } from '@/components/lead-form';
import { OfferCta } from '@/components/landing/offer-cta';
import { ParallaxSection } from '@/components/ui/parallax-section';
import { PAGE_COPY as C } from '@/lib/page-copy';
import { IMAGES } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';

// Section order and layout logic follow docs/STRUCTURE_MAP.md. Palette law: midnight appears only
// on ivory surfaces; on oxblood the accent is ivory-alt.

function Eyebrow({ children, onDark = false }: { children: ReactNode; onDark?: boolean }) {
  return (
    <p
      className={cn(
        'flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-[0.22em]',
        onDark ? 'text-ivory-alt' : 'text-muted-foreground',
      )}
    >
      <span className={cn('h-px w-5', onDark ? 'bg-ivory-alt' : 'bg-midnight')} />
      {children}
      <span className={cn('h-px w-5', onDark ? 'bg-ivory-alt' : 'bg-midnight')} />
    </p>
  );
}

function SectionHead({ eyebrow, title, body }: { eyebrow?: string; title: string; body?: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{title}</h2>
      {body && <p className="mx-auto mt-4 max-w-[60ch] text-pretty text-base text-muted-foreground sm:text-lg">{body}</p>}
    </div>
  );
}

export function Header() {
  const icons = [MapPin, FileText, CircleDollarSign];
  return (
    <header data-section="nav" className="border-b border-border bg-background px-4">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-6">
        <span className="text-sm font-bold uppercase tracking-[0.24em] text-foreground">{C.brand}</span>
        <ul className="hidden items-center gap-7 lg:flex">
          {C.header.badges.map((badge, i) => {
            const Icon = icons[i];
            return (
              <li key={badge} className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <Icon aria-hidden className="size-5 text-midnight" />
                {badge}
              </li>
            );
          })}
        </ul>
        <OfferCta />
      </div>
    </header>
  );
}

export function Hero() {
  return (
    <ParallaxSection
      mode="hero"
      data-section="hero"
      className="bg-oxblood text-ivory"
      background={
        <>
          <Image src={IMAGES.hero.src} alt={IMAGES.hero.alt} fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-[color-mix(in_srgb,var(--da-oxblood)_80%,transparent)]" />
        </>
      }
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:py-20 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-14">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-ivory-alt">{C.hero.eyebrow}</p>
          <h1 className="mt-4 text-balance text-4xl font-bold leading-[1.05] tracking-tight text-ivory sm:text-5xl lg:text-[3.4rem]">
            <span className="block">{C.hero.headline[0]}</span>
            <span className="mt-2 block text-[color-mix(in_srgb,var(--da-ivory)_72%,var(--da-oxblood))]">{C.hero.headline[1]}</span>
          </h1>
          <p className="mt-5 max-w-[46ch] text-pretty text-lg text-[color-mix(in_srgb,var(--da-ivory)_80%,var(--da-oxblood))]">
            {C.hero.subhead}
          </p>
          <ul className="mt-7 grid gap-3">
            {C.hero.bullets.map((b) => (
              <li key={b.label} className="flex items-start gap-3 text-base">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full border border-ivory-alt/50">
                  <Check aria-hidden className="size-3.5 text-ivory-alt" />
                </span>
                <span>
                  <strong className="font-bold text-ivory">{b.label}</strong>{' '}
                  <span className="text-[color-mix(in_srgb,var(--da-ivory)_78%,var(--da-oxblood))]">{b.text}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div id="offer" className="scroll-mt-24">
          <LeadForm className="shadow-[0_30px_70px_-30px_rgba(20,4,4,0.65)]" />
          <p className="mt-3 text-center text-sm text-[color-mix(in_srgb,var(--da-ivory)_80%,var(--da-oxblood))]">{C.hero.underButton}</p>
          <p className="mt-1 text-center text-xs text-[color-mix(in_srgb,var(--da-ivory)_70%,var(--da-oxblood))]">{C.hero.privacy}</p>
        </div>
      </div>
      <div id="hero-end" aria-hidden className="h-px" />
    </ParallaxSection>
  );
}

export function TrustBar() {
  const icons = [MapPin, FileText, CircleDollarSign, CalendarCheck];
  return (
    <section data-section="trust" className="border-b border-border bg-background px-4 py-8">
      <p className="text-center text-sm font-semibold text-foreground">{C.trust.label}</p>
      <ul className="mx-auto mt-5 grid max-w-4xl grid-cols-2 gap-y-5 sm:grid-cols-4 sm:divide-x sm:divide-border">
        {C.trust.tiles.map((tile, i) => {
          const Icon = icons[i];
          return (
            <li key={tile} className="flex flex-col items-center gap-2 px-3 text-center text-sm font-semibold text-foreground">
              <span className="grid size-10 place-items-center rounded-full bg-secondary">
                <Icon aria-hidden className="size-5 text-midnight" />
              </span>
              {tile}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export function ProofBand() {
  return (
    <section data-section="proof" className="bg-background px-4 py-12 sm:py-16">
      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-3xl bg-oxblood text-ivory lg:grid-cols-[240px_1fr_minmax(0,420px)]">
        <div className="relative hidden min-h-56 lg:block">
          <Image src={IMAGES.proof.src} alt={IMAGES.proof.alt} fill sizes="240px" className="object-cover" />
        </div>
        <p className="p-7 text-pretty text-xl font-semibold leading-snug sm:p-9 sm:text-2xl">{C.proof.statement}</p>
        <ul className="grid border-t border-[color-mix(in_srgb,var(--da-ivory)_18%,var(--da-oxblood))] sm:grid-cols-3 lg:border-l lg:border-t-0">
          {C.proof.columns.map((col) => (
            <li
              key={col.title}
              className="border-[color-mix(in_srgb,var(--da-ivory)_18%,var(--da-oxblood))] p-6 text-center sm:border-l sm:first:border-l-0"
            >
              <p className="font-bold text-ivory">{col.title}</p>
              <p className="mt-2 text-sm text-[color-mix(in_srgb,var(--da-ivory)_76%,var(--da-oxblood))]">{col.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function DirectSale() {
  return (
    <section data-section="direct" className="bg-background px-4 py-20 sm:py-24">
      <SectionHead eyebrow={C.direct.eyebrow} title={C.direct.title} body={C.direct.body} />
      <div className="mt-8 flex justify-center">
        <OfferCta />
      </div>
      <p className="mt-4 text-center text-sm font-semibold text-foreground">{C.direct.note}</p>
    </section>
  );
}

export function Situations() {
  const icons = [KeyRound, Hammer, Building2, Truck];
  return (
    <section data-section="situations" className="bg-secondary/60 px-4 py-20 sm:py-24">
      <SectionHead eyebrow={C.situations.eyebrow} title={C.situations.title} body={C.situations.body} />
      <ul className="mx-auto mt-12 grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {C.situations.cards.map((card, i) => {
          const Icon = icons[i];
          return (
            <li key={card.title} className="rounded-2xl border border-border bg-background p-6">
              <Icon aria-hidden className="size-6 text-midnight" />
              <h3 className="mt-4 text-lg font-bold tracking-tight text-foreground">{card.title}</h3>
              <p className="mt-2 text-base text-muted-foreground">{card.text}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export function Process() {
  return (
    <section data-section="process" className="bg-background px-4 py-20 sm:py-24">
      <SectionHead eyebrow={C.process.eyebrow} title={C.process.title} body={C.process.body} />
      <ol className="mx-auto mt-12 grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {C.process.steps.map((step, i) => (
          <li key={step} className="rounded-2xl border border-border bg-card p-6">
            <span className="inline-flex rounded-full bg-secondary px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-midnight">
              Step {i + 1}
            </span>
            <p className="mt-4 text-base font-semibold text-foreground">{step}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function AskBand() {
  return (
    <ParallaxSection
      mode="inline"
      strength={140}
      data-section="band"
      className="bg-oxblood text-ivory"
      background={
        <>
          <Image src={IMAGES.band.src} alt={IMAGES.band.alt} fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-[color-mix(in_srgb,var(--da-oxblood)_84%,transparent)]" />
        </>
      }
    >
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:py-24">
        <h2 className="text-balance text-3xl font-bold tracking-tight text-ivory sm:text-4xl">{C.band.title}</h2>
        <p className="mt-4 text-lg text-[color-mix(in_srgb,var(--da-ivory)_80%,var(--da-oxblood))]">{C.band.body}</p>
        <div className="mt-8 flex justify-center">
          <OfferCta tone="inverted" />
        </div>
        <p className="mt-4 text-sm font-semibold text-ivory-alt">{C.band.note}</p>
      </div>
    </ParallaxSection>
  );
}

export function WhyDofrane() {
  return (
    <section data-section="why" className="bg-background px-4 py-20 sm:py-24">
      <SectionHead eyebrow={C.why.eyebrow} title={C.why.title} body={C.why.body} />
      <ul className="mx-auto mt-12 grid max-w-5xl gap-4 md:grid-cols-3">
        {C.why.cards.map((card) => (
          <li key={card.title} className="rounded-2xl border border-border bg-card p-6">
            <h3 className="text-lg font-bold tracking-tight text-foreground">{card.title}</h3>
            <p className="mt-2 text-base text-muted-foreground">{card.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Compare() {
  return (
    <section data-section="compare" className="bg-secondary/60 px-4 py-20 sm:py-24">
      <SectionHead eyebrow={C.compare.eyebrow} title={C.compare.title} body={C.compare.body} />
      <ul className="mx-auto mt-10 grid max-w-3xl gap-3">
        {C.compare.rows.map((row) => (
          <li
            key={row.label}
            className={cn(
              'flex flex-col gap-1 rounded-xl border bg-background px-5 py-4 sm:flex-row sm:items-center sm:justify-between',
              row.ours ? 'border-2 border-midnight' : 'border-border',
            )}
          >
            <span className="flex items-center gap-2 font-bold text-foreground">
              {row.ours && <Check aria-hidden className="size-4 text-midnight" />}
              {row.label}
            </span>
            <span className={cn('text-sm', row.ours ? 'font-semibold text-midnight' : 'text-muted-foreground')}>{row.text}</span>
          </li>
        ))}
      </ul>
      <div className="mt-8 flex justify-center">
        <OfferCta />
      </div>
    </section>
  );
}

export function ServiceArea() {
  return (
    <section data-section="area" className="bg-background px-4 py-20 sm:py-24">
      <SectionHead eyebrow={C.area.eyebrow} title={C.area.title} body={C.area.body} />
      <ul className="mx-auto mt-8 flex max-w-4xl flex-wrap justify-center gap-2">
        {C.area.places.map((place) => (
          <li key={place} className="rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground">
            {place}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Faq() {
  return (
    <section data-section="faq" className="bg-secondary/60 px-4 py-20 sm:py-24">
      <SectionHead eyebrow={C.faq.eyebrow} title={C.faq.title} />
      <div className="mx-auto mt-10 grid max-w-3xl gap-3">
        {C.faq.items.map((item) => (
          <details key={item.q} className="group rounded-xl border border-border bg-background">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-bold text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-midnight [&::-webkit-details-marker]:hidden">
              {item.q}
              <ChevronDown aria-hidden className="size-5 shrink-0 text-midnight transition-transform duration-200 ease-out group-open:rotate-180 motion-reduce:transition-none" />
            </summary>
            <p className="px-5 pb-5 text-base text-muted-foreground">{item.a}</p>
          </details>
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <OfferCta />
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer data-section="footer" className="bg-oxblood px-4 py-16 text-ivory">
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-sm font-bold uppercase tracking-[0.24em] text-ivory">{C.brand}</p>
        <p className="mx-auto mt-4 max-w-[52ch] text-[color-mix(in_srgb,var(--da-ivory)_80%,var(--da-oxblood))]">{C.footer.line}</p>
        <div className="mt-8 flex justify-center">
          <OfferCta tone="inverted" />
        </div>
        <div className="mt-12 grid gap-3 border-t border-[color-mix(in_srgb,var(--da-ivory)_18%,var(--da-oxblood))] pt-8 text-left text-xs leading-relaxed text-[color-mix(in_srgb,var(--da-ivory)_66%,var(--da-oxblood))] md:grid-cols-2">
          {C.footer.disclosures.map((line, i) => (
            <p key={i} data-disc={`L${i + 1}`}>
              {line}
            </p>
          ))}
        </div>
        <p className="mt-8 text-xs text-[color-mix(in_srgb,var(--da-ivory)_66%,var(--da-oxblood))]">{C.footer.legal}</p>
      </div>
    </footer>
  );
}
