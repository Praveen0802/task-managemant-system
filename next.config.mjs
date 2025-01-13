/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_MONGO_URL:
      "mongodb+srv://praveenusain111:iZRoXoOoMc77fHcE@cluster-1.p7hcr.mongodb.net/prod_task_management?retryWrites=true&w=majority",
  },
};

export default nextConfig;
