/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  // REMOVE basePath and assetPrefix for Netlify
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
