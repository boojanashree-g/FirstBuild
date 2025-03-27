/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    forceSwcTransforms: true, // Forces SWC to be used even with Babel
  }
};

module.exports = nextConfig;
