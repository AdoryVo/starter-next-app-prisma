/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: [
      'app',
      'utils'
    ]
  },
  experimental: {
    appDir: true,
    typedRoutes: true,
  },
}

module.exports = nextConfig
