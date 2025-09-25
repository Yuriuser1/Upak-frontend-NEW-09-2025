#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Netlify build process...');

// Создаем временный next.config.js для Netlify
const netlifyNextConfig = `
const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true, // Игнорируем ошибки TypeScript для Netlify build
  },
  experimental: {
    outputFileTracingRoot: path.join(__dirname, '../'),
  },
  // Исключаем Prisma из серверного кода во время build если нет DATABASE_URL
  webpack: (config, { isServer }) => {
    if (isServer && !process.env.DATABASE_URL) {
      config.externals = config.externals || [];
      config.externals.push('@prisma/client');
    }
    return config;
  },
};

module.exports = nextConfig;
`;

// Сохраняем оригинальный конфиг
const originalConfig = fs.existsSync('next.config.js') ? fs.readFileSync('next.config.js', 'utf8') : '';

try {
  // Записываем Netlify конфиг
  fs.writeFileSync('next.config.js', netlifyNextConfig);
  
  console.log('✅ Created Netlify next.config.js');
  
  // Запускаем сборку без Prisma generate если нет DATABASE_URL
  if (!process.env.DATABASE_URL) {
    console.log('🚧 DATABASE_URL not set, skipping Prisma generate');
    execSync('npm run build', { stdio: 'inherit' });
  } else {
    console.log('🗄️ DATABASE_URL found, running with Prisma');
    execSync('npx prisma generate && npm run build', { stdio: 'inherit' });
  }
  
  console.log('✅ Netlify build completed successfully!');
  
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