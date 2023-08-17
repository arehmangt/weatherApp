/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.weatherapi.com'],
  },
  publicRuntimeConfig: {
    apiKey: process.env.API_KEY,
  },
}

module.exports = nextConfig
