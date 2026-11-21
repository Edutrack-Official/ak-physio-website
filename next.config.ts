import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Azure Static Web Apps serves plain files: `next build` writes the whole
  // site to ./out, which is the folder the deploy workflow uploads.
  output: "export",
  // Every page becomes <route>/index.html, so deep links resolve on any static host.
  trailingSlash: true,
  // The image optimiser needs a server; a static export has none.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
