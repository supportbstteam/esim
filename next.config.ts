import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "flagcdn.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "esimaero.com", // ✅ ADD THIS
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;