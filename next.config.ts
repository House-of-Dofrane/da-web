import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Unsplash placeholders for the R03 preview only (lib/placeholder-images.ts).
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
};

export default nextConfig;
