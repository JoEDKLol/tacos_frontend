import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  images: {
    remotePatterns: [
        {
            protocol: 'http',
            hostname: '**',
        },
        {
            protocol: 'https',
            hostname: '**',
        },
    ],
},
  env: {
    API_URL: process.env.API_URL,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
},

};

export default nextConfig;
