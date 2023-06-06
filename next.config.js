/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
    serverActions: true,
  },
  env: {
    PRODUCTION: process.env.PRODUCTION === 'true',
    APP_URL: process.env.APP_URL || 'http://localhost:3000',
    MAIL_HOST: process.env.MAIL_HOST,
    MAIL_ADMIN_EMAIL: process.env.MAIL_ADMIN_EMAIL,
    MAIL_ADMIN_PASSWORD: process.env.MAIL_ADMIN_PASSWORD,
    AUTH_ACCESS_TOKEN_SECRET: process.env.AUTH_ACCESS_TOKEN_SECRET,
    AUTH_ACCESS_TOKEN_ENCRYPTION_SECRET: process.env.AUTH_ACCESS_TOKEN_ENCRYPTION_SECRET,
    AUTH_REFRESH_TOKEN_SECRET: process.env.AUTH_REFRESH_TOKEN_SECRET,
    AUTH_REFRESH_TOKEN_ENCRYPTION_SECRET: process.env.AUTH_REFRESH_TOKEN_ENCRYPTION_SECRET,
    AUTH_GOOGLE_CLIENT_ID: process.env.AUTH_GOOGLE_CLIENT_ID,
    AUTH_GOOGLE_CLIENT_SECRET: process.env.AUTH_GOOGLE_CLIENT_SECRET,
    AUTH_FACEBOOK_APP_ID: process.env.AUTH_FACEBOOK_APP_ID,
    AUTH_FACEBOOK_APP_SECRET: process.env.AUTH_FACEBOOK_APP_SECRET,
    AUTH_GITHUB_CLIENT_ID: process.env.AUTH_GITHUB_CLIENT_ID,
    AUTH_GITHUB_CLIENT_SECRET: process.env.AUTH_GITHUB_CLIENT_SECRET,
  }
}

module.exports = nextConfig
