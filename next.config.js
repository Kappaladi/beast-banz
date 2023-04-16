/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["avatars.akamai.steamstatic.com"],
  },
  compiler: {
    removeConsole: {
      exclude: ["error"],
    },
  },
};

module.exports = nextConfig;
