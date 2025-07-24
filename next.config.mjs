/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    basePath: '/synx-web',
    trailingSlash: true,
    images: {
        unoptimized: true,
    },
};

export default nextConfig;
