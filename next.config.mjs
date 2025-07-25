/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  // For GitHub Pages deployment to root, use empty basePath
  // For deployment to a subdirectory (e.g., /website), uncomment the line below
  // basePath: process.env.NODE_ENV === 'production' ? '/website' : '',
  // Ensure images are handled correctly in static export
  images: {
    unoptimized: true,
  },
  // Optional: Add trailing slash for better compatibility
  trailingSlash: true,
};

export default nextConfig;
