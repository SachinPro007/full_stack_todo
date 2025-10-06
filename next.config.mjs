/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: [
      "config",
      "app",
      "components",
      "lib",
      "eslint.config.mjs",
      "auth.js",
      "middleware.js",
    ],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
};

export default nextConfig;
