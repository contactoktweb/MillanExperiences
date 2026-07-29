/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
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
