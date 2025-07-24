/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    basePath: '/website',
    images: {
        unoptimized: true,
    },
    env: {
        NEXT_PUBLIC_BASE_PATH: '/website',
    },
};

export default nextConfig;
