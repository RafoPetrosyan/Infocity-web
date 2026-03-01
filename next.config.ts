/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

export default withNextIntl({
    reactStrictMode: false,
    images: {
        remotePatterns: [
            { protocol: 'https', hostname: '*', pathname: '**' },
            { protocol: 'http', hostname: '*', pathname: '**' },
        ],
    },
});