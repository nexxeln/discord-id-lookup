const WindiCSSWebpackPlugin = require("windicss-webpack-plugin");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["cdn.discordapp.com"],
  },
  webpack(config) {
    config.plugins.push(new WindiCSSWebpackPlugin());

    return config;
  },
};

module.exports = nextConfig;
