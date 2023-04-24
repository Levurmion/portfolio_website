/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    'MYSQL_HOST': '34.142.2.146',
    'MYSQL_PORT': '3306',
    'MYSQL_DATABASE': 'django_cosmouse_db',
    'MYSQL_USER': 'root',
    'MYSQL_PASSWORD': 'human2023embryo',
  }
}

module.exports = nextConfig
