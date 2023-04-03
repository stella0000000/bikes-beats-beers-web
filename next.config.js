/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['i.scdn.co', 'mosaic.scdn.co', 'seed-mix-image.spotifycdn.com'],
  },
}

module.exports = nextConfig
