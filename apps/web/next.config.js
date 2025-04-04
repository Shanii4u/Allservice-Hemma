const withNextIntl = require('next-intl/plugin')();

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@all-service-hemma/ui'],
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3005']
    }
  },
  images: {
    domains: ['via.placeholder.com', 'all-service-hemma-app.vercel.app'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/sv',
        permanent: true,
      },
    ];
  },
  webpack: (config) => {
    config.externals = [...(config.externals || []), 'bcrypt'];
    return config;
  },
};

module.exports = withNextIntl(nextConfig); 