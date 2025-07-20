import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: 'res.cloudinary.com',
        pathname: '**'
      }
    ]
  },
  eslint: {
    ignoreDuringBuilds: true, // ← ini mematikan error ESLint saat build
  },
};

export default nextConfig;
