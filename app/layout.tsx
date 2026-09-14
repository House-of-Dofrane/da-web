import type { Metadata } from "next";
import "./globals.css";

export const SITE_URL = "https://dofraneacquisitions.com";
export const SITE_NAME = "Dofrane Acquisitions";

// Title 48 chars, description 123 chars. Metadata copy sits behind the same copy gate as the page;
// the wording here is drawn from the R04 draft and changes with the ruling.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Maryland Cash Home Buyers | Dofrane Acquisitions",
  description:
    "Written cash offers on Maryland houses as they stand. No repairs, no agent commission, no showings. Start with the address.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Maryland Cash Home Buyers | Dofrane Acquisitions",
    description: "Written cash offers on Maryland houses as they stand. No repairs, no agent commission, no showings.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Maryland Cash Home Buyers | Dofrane Acquisitions",
    description: "Written cash offers on Maryland houses as they stand. No repairs, no agent commission, no showings.",
  },
  robots: { index: true, follow: true },
};

// One family, Helvetica on the system stack (brand ruling 2026-09-09): no next/font request.
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        {/* Tile servers for the service-area map: handshake early, cheap when unused. */}
        <link rel="preconnect" href="https://a.basemaps.cartocdn.com" crossOrigin="" />
        <link rel="preconnect" href="https://b.basemaps.cartocdn.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://c.basemaps.cartocdn.com" />
        <link rel="dns-prefetch" href="https://d.basemaps.cartocdn.com" />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
