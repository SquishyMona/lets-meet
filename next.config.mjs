/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/__/handler',
                destination: 'http://lets-meet-scheduling-app.firebaseapp.com/api/__/handler',
            },
        ];
    }
};

export default nextConfig;
