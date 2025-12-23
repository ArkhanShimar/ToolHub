/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com', 'firebasestorage.googleapis.com'],
    formats: ['image/webp', 'image/avif'],
  },
}

module.exports = nextConfig