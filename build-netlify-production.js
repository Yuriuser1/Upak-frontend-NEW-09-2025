#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Netlify production build...');

// Создаем next.config.js для Netlify с поддержкой plugin
const netlifyNextConfig = `
const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    outputFileTracingRoot: path.join(__dirname, '../'),
  },
  // Настройки для Netlify
  trailingSlash: false,
  images: {
    domains: ['upak.tech', 'localhost'],
    unoptimized: false, // Оставляем оптимизацию изображений для Netlify
  },
  // Исключаем Prisma из build если нет DATABASE_URL
  webpack: (config, { isServer }) => {
    if (isServer && !process.env.DATABASE_URL) {
      config.externals = config.externals || [];
      config.externals.push('@prisma/client');
    }
    return config;
  },
  // Настройки для правильной работы API routes на Netlify
  async rewrites() {
    return [];
  },
  // Отключаем статическую генерацию для динамических API маршрутов
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
`;

// Сохраняем оригинальный конфиг
const originalConfig = fs.existsSync('next.config.js') ? fs.readFileSync('next.config.js', 'utf8') : '';

try {
  // Записываем Netlify конфиг
  fs.writeFileSync('next.config.js', netlifyNextConfig);
  
  console.log('✅ Created Netlify production next.config.js');

  // Проверяем переменные окружения
  if (!process.env.DATABASE_URL) {
    console.log('🚧 DATABASE_URL not set, Prisma will be mocked during build');
  } else {
    console.log('🗄️ DATABASE_URL found, Prisma will be initialized');
  }

  // Запускаем сборку
  console.log('📦 Building Next.js application...');
  execSync('npm run build', { stdio: 'inherit' });
  
  console.log('✅ Netlify production build completed successfully!');
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
} finally {
  // Восстанавливаем оригинальный конфиг
  if (originalConfig) {
    fs.writeFileSync('next.config.js', originalConfig);
    console.log('✅ Restored original next.config.js');
  }
}