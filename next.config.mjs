/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'https://gadgetgrid.ro',

      },
    ],
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  serverRuntimeConfig: {
   
    myHostname: ['164.90.167.98', 'https://gadgetgrid.ro'], 
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: 'https://gadgetgrid.ro', 
          },
          
        ],
      },
    ];
  },
};
export default nextConfig;
