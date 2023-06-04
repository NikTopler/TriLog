/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
    serverActions: true,
  },
  env: {
    PRODUCTION: process.env.PRODUCTION === 'true',
    APP_URL: process.env.APP_URL,
    DB_PORT: process.env.DB_PORT,
    DB_HOST: process.env.DB_HOST,
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    DB_PROVIDER: process.env.DB_PROVIDER,
    MAIL_HOST: process.env.MAIL_HOST,
    MAIL_ADMIN_EMAIL: process.env.MAIL_ADMIN_EMAIL,
    MAIL_ADMIN_PASSWORD: process.env.MAIL_ADMIN_PASSWORD,
    AUTH_GOOGLE_CLIENT_ID: process.env.AUTH_GOOGLE_CLIENT_ID,
    AUTH_GOOGLE_CLIENT_SECRET: process.env.AUTH_GOOGLE_CLIENT_SECRET,
    AUTH_FACEBOOK_APP_ID: process.env.AUTH_FACEBOOK_APP_ID,
    AUTH_FACEBOOK_APP_SECRET: process.env.AUTH_FACEBOOK_APP_SECRET,
    AUTH_GITHUB_CLIENT_ID: process.env.AUTH_GITHUB_CLIENT_ID,
    AUTH_GITHUB_CLIENT_SECRET: process.env.AUTH_GITHUB_CLIENT_SECRET,
  }
}

module.exports = nextConfig
