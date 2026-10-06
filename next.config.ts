import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/webp"],
    qualities: [60],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    deviceSizes: [640, 828, 1080, 1200, 1920],
    imageSizes: [64, 96, 128, 240, 384, 640],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "aronixinfra.com",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;
