/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://121.152.79.226:13000/api/:path*',
      },
    ];
  },

};

export default nextConfig;
