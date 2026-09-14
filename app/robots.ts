import type { MetadataRoute } from "next";

// Public page indexable; the lead API and design drafts are not. Vercel adds x-robots-tag: noindex
// on preview deployments by itself; production on the domain carries no such header.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/_design/"] }],
    sitemap: "https://dofraneacquisitions.com/sitemap.xml",
  };
}
