/** @type {import("next").NextConfig} */
const nextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com']
  },
  // Next.js 14 版本之後可省略
  experimental: {
    serverActions: true
  }
}

module.exports = nextConfig
