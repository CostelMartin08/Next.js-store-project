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
};
export default nextConfig;
