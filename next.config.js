/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: [
      "image-cdn-ak.spotifycdn.com",
      "i.scdn.co",
      "mosaic.scdn.co",
      "seed-mix-image.spotifycdn.com",
      "*",
    ],
  },
};

module.exports = nextConfig;
