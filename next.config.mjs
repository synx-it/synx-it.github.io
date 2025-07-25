/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const basePath = isProd ? '/website' : '';

const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  basePath: basePath,
  assetPrefix: basePath ? `${basePath}/` : '',
  
  // Ensure images are handled correctly in static export
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
      publicPath: `${basePath}/_next/`,
    };
    return config;
  },
};

export default nextConfig;
