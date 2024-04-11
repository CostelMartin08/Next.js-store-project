/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'avatars.githubusercontent.com',
        // Exemplu: path: /^https:\/\/example\.com\/.*$/
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
   
    myHostname: ['164.90.167.98', 'http://gadgetgrid.ro'], 
  },
};
export default nextConfig;
