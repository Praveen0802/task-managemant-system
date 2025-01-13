/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  env: {
    MONGO_DB_URL: process.env.MONGO_URL,
  },
};

export default nextConfig;
