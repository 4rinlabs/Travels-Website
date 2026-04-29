import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "qvbledkqsvemfkmrfkwu.supabase.co",
      },
    ],
  },
};

export default nextConfig;