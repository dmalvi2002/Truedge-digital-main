import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep fixture smoke tests isolated from the real production build and CMS.
  distDir: process.env.SANITY_TEST_MODE === "1" ? ".next-sanity-test" : ".next",
  async rewrites() {
    // Existing Studio assets are served first; editor deep links use its SPA.
    return { afterFiles: [{ source: "/admin/:path*", destination: "/admin/index.html" }] };
  },
  async headers() {
    return [{ source: "/admin/:path*", headers: [
      { key: "X-Robots-Tag", value: "noindex, nofollow" },
      { key: "Cache-Control", value: "no-cache" },
    ] }];
  },
  // Add this images section to whitelist Cloudinary
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/w5f40uwq/production/**",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
        pathname: "/photos/7693685/pexels-photo-7693685.jpeg",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "img.freepik.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
