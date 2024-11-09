/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/__/auth/:path*',
                destination: 'http://lets-meet-scheduling-app.firebaseapp.com/__/auth/:path*',
            },
        ];
    }
};

export default nextConfig;
