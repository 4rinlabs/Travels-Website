import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mmfveftiotwwfcewbfnp.supabase.co",
      },
    ],
  },
};

export default nextConfig;