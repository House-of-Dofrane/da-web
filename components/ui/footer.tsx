import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterContact {
  label: string;
  href: string;
  icon: LucideIcon;
}

export interface FooterProps {
  logoSrc: string;
  logoAlt?: string;
  brandName: string;
  tagline?: string;
  /** Contact methods (phone/email). Omitted entirely when none are configured — never a placeholder. */
  contactLinks?: FooterContact[];
  mainLinks: FooterLink[];
  legalLinks: FooterLink[];
  copyright: string;
  /** Extra content (a CTA, legal disclosures) rendered between the brand lockup and the nav. */
  children?: ReactNode;
  className?: string;
}

// Branded footer. Intentionally a DARK brand surface (oxblood ground, ivory text, gold accents) —
// the page's light theme tokens (text-primary = oxblood) would be invisible here, so the footer
// uses the explicit brand-dark treatment the rest of the oxblood sections use.
export function Footer({
  logoSrc,
  logoAlt = "",
  brandName,
  tagline,
  contactLinks,
  mainLinks,
  legalLinks,
  copyright,
  children,
  className,
}: FooterProps) {
  const muted = "text-[color-mix(in_srgb,var(--da-ivory)_80%,var(--da-oxblood))]";
  const faint = "text-[color-mix(in_srgb,var(--da-ivory)_66%,var(--da-oxblood))]";
  return (
    <footer data-section="footer" className={cn("bg-oxblood px-4 py-16 text-ivory", className)}>
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex items-center gap-3">
            <Image
              src={logoSrc}
              alt={logoAlt}
              aria-hidden={logoAlt === "" || undefined}
              width={40}
              height={40}
              className="h-9 w-9"
            />
            <span className="text-sm font-bold uppercase tracking-[0.24em] text-gold">{brandName}</span>
          </div>
          {tagline ? <p className={cn("max-w-[52ch]", muted)}>{tagline}</p> : null}
          {contactLinks && contactLinks.length > 0 ? (
            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {contactLinks.map(({ label, href, icon: Icon }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="inline-flex items-center gap-2 text-sm text-ivory underline-offset-4 hover:text-gold hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                  >
                    <Icon aria-hidden className="size-4 text-gold" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        {children}

        <nav
          aria-label="Footer"
          className={cn("mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm", muted)}
        >
          {[...mainLinks, ...legalLinks].map((l) => (
            <a key={`${l.href}-${l.label}`} href={l.href} className="underline-offset-4 hover:text-gold hover:underline">
              {l.label}
            </a>
          ))}
        </nav>

        <p className={cn("mt-8 text-center text-xs", faint)}>{copyright}</p>
      </div>
    </footer>
  );
}
