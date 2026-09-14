import type { MetadataRoute } from "next";

// One public route today. lastModified is the build time, so every deploy refreshes it.
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: "https://dofraneacquisitions.com/", lastModified: new Date(), changeFrequency: "weekly", priority: 1 }];
}
