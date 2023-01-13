/** @type {import('next').NextConfig} */

const env = {};

for (const key in env) {
  if (key.startsWith('__')) continue;     //이 형태는 수정 하면 안된다. __ 로 시작하는 KEY
  if (key.startsWith('NODE_')) continue;  //이 형태는 수정 하면 안된다. NODE_ 로 시작하는 KEY
    env[key] = process.env[key];
}

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env:{
    school: 'KOREA',
  },
}

module.exports = nextConfig
