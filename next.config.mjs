/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      { source: '/about', destination: '/', permanent: false },
      { source: '/resume.pdf', destination: '/coming-soon', permanent: false },
    ];
  },
};

export default nextConfig;
