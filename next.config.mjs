/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  output: 'export',
  // Remove basePath and assetPrefix for GitHub Pages root URL
  // or set them to empty strings if you want to deploy to the root of your domain
  basePath: '',
  assetPrefix: '',
  trailingSlash: true,
};

export default nextConfig;
