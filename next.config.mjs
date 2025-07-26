/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
// For GitHub Pages deployment, serve from root since repo is named 'website'
const basePath = '';
const assetPrefix = '';

const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  // Remove basePath for root deployment
  basePath,
  assetPrefix,

  // Ensure images are handled correctly in static 
  // export
  images: {
    unoptimized: true,
  },

  // Add trailing slash for better compatibility with GitHub Pages
  trailingSlash: true,

  // Optional: Add webpack configuration for static export
  webpack: (config) => {
    // Add support for static export
    config.output = {
      ...config.output,
      publicPath: '/_next/',
    };
    return config;
  },
};

export default nextConfig;
