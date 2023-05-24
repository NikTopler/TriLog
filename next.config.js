/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
    serverActions: true,
  },
  env: {
    DB_PORT: process.env.DB_PORT,
    DB_HOST: process.env.DB_HOST,
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    DB_PROVIDER: process.env.DB_PROVIDER,
    MAIL_HOST: process.env.MAIL_HOST,
    MAIL_ADMIN_EMAIL: process.env.MAIL_ADMIN_EMAIL,
    MAIL_ADMIN_PASSWORD: process.env.MAIL_ADMIN_PASSWORD
  }
}

module.exports = nextConfig
