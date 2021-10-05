/** @type {import('next').NextConfig} */
const dotenv = require('dotenv')
const path = require('path')

module.exports = {
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        });

        return config;
    },
    reactStrictMode: true,
    env: process.env.NEXT_ENV === 'dev'
        ? dotenv
            .config({ path: path.join(__dirname, '.env.development.local')})
            .parsed || {}
        : process.env.NEXT_ENV === 'test'
            ? dotenv
                .config({ path: path.join(__dirname, '.env.test.local')})
                .parsed || {}
            : process.env.NEXT_ENV === 'prod'
                ? dotenv
                    .config({ path: path.join(__dirname, '.env.production.local')})
                    .parsed || {}
                : {},
};
