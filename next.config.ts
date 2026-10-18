import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep fixture smoke tests isolated from the real production build and CMS.
  distDir: process.env.SANITY_TEST_MODE === "1" ? ".next-sanity-test" : ".next",
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
