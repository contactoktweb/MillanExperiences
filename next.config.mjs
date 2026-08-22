/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.sanity.io',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/villas-and-islands",
        destination: "/luxury-villas",
        permanent: true,
      },
      {
        source: "/boats-and-yachts",
        destination: "/speedboats",
        permanent: true,
      },
      {
        source: "/groups-and-events",
        destination: "/bachelor-bachelorette-parties",
        permanent: true,
      },
      {
        source: "/services",
        destination: "/services/concierge",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
