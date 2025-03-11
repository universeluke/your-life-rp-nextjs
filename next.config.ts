import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp'],
  },
  // Enable React strict mode for better development
  reactStrictMode: true,
  // Enable production source maps for better debugging
  productionBrowserSourceMaps: true,
  // Optimize fonts
  optimizeFonts: true,
  // Enable SWC minification for faster builds
  swcMinify: true,
};

export default nextConfig;
