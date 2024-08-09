/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: 'http://121.152.79.226:13000/api/v1/:path*',
      },
    ];
  },
};

export default nextConfig;
