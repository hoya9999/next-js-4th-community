/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    my: 'love', 
    school: 'korea',
    list: true    
  },
}

module.exports = nextConfig
