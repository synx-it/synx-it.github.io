/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  // Set basePath for /website subdirectory deployment
  basePath: '/',
  assetPrefix: '/ ',

  // Ensure images are handled correctly in static 
  // export
  images: {
    unoptimized: true,
  },

  // Set environment variable for image paths
  env: {
    NEXT_PUBLIC_BASE_PATH: '/',
  },

  // Add trailing slash for better compatibility with GitHub Pages
  trailingSlash: true,

  // Optional: Add webpack configuration for static export
  webpack: (config) => {
    // Add support for static export with website prefix
    config.output = {
      ...config.output,
      publicPath: '/_next/',
    };
    return config;
  },
};

export default nextConfig;
