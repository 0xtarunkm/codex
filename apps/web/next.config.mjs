/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['store'],
  images: {
    domains: ['bit.ly'],
  },
};

export default nextConfig;
