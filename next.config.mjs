/** @type {import('next').NextConfig} */
const nextConfig = {
  // REMOVE output: "export" - this is required for API routes to work
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
