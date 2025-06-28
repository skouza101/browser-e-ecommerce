/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/dccu4tbxj/image/upload/**',
      },
    ],
  },
};

export default nextConfig;

