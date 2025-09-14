/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['sharp']
  },
  images: {
    domains: ['localhost'],
    unoptimized: true
  },
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
}

module.exports = nextConfig
