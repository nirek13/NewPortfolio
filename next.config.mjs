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
      { source: '/about',             destination: '/coming-soon', permanent: false },
      { source: '/essays',            destination: '/coming-soon', permanent: false },
      { source: '/essays/:path*',     destination: '/coming-soon', permanent: false },
      { source: '/photography',       destination: '/coming-soon', permanent: false },
      { source: '/photography/:path*',destination: '/coming-soon', permanent: false },
      { source: '/resume.pdf',        destination: '/coming-soon', permanent: false },
    ];
  },
};

export default nextConfig;
