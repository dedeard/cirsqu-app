/** @type {import('next').NextConfig} */
const nextConfig = {
  publicRuntimeConfig: {
    baseApiUrl: process.env.NEXT_PUBLIC_BASE_API_URL || 'http://localhost:3000',
  },
}

module.exports = nextConfig
