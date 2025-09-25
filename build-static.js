#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting static build process...');

// Создаем временный next.config.js для статического экспорта
const staticNextConfig = `
const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
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
  async generateBuildId() {
    return 'upak-static-export'
  },
};

module.exports = nextConfig;
`;

// Сохраняем оригинальный конфиг
const originalConfig = fs.existsSync('next.config.js') ? fs.readFileSync('next.config.js', 'utf8') : '';

try {
  // Записываем статический конфиг
  fs.writeFileSync('next.config.js', staticNextConfig);
  
  console.log('✅ Created static next.config.js');
  
  // Запускаем сборку
  execSync('npx next build', { stdio: 'inherit' });
  
  console.log('✅ Static build completed successfully!');
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
} finally {
  // Восстанавливаем оригинальный конфиг
  if (originalConfig) {
    fs.writeFileSync('next.config.js', originalConfig);
  }
}