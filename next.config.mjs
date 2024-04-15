/** @type {import('next').NextConfig} */

import localhostUrl from "./nodeEnv";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: `${localhostUrl}`,

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

    myHostname: ['164.90.167.98', `${localhostUrl}`],
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: `${localhostUrl}`,
          },

        ],
      },
    ];
  },
};
export default nextConfig;
