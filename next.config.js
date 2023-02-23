/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: [
    'page.tsx',
    'api.ts',
    'api.tsx'
  ],
  images: {
    domains: [
      "lh3.googleusercontent.com",
    ],
  },
  extends: [
    //...
    'plugin:@next/next/recommended',
  ],
}

module.exports = nextConfig
