import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Add this images section to whitelist Cloudinary
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;