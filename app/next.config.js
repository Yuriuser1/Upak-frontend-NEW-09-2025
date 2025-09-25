
const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'out',
  trailingSlash: true,
  images: { 
    unoptimized: true 
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    outputFileTracingRoot: path.join(__dirname, '../../'),
  },
  // Исключаем API роуты из статического экспорта
  async generateBuildId() {
    return 'upak-static-export'
  },
  // Исключаем динамические роуты
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    // Фильтруем только страницы, исключая API роуты
    const pathMap = {};
    for (const [path, page] of Object.entries(defaultPathMap)) {
      if (!path.startsWith('/api/')) {
        pathMap[path] = page;
      }
    }
    return pathMap;
  },
};

module.exports = nextConfig;
