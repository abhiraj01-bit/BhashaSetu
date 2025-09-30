#!/usr/bin/env node

/**
 * Simple development check script
 * Validates that all key files exist and basic structure is correct
 */

import { existsSync } from 'fs';
import { join } from 'path';

const requiredFiles = [
  'package.json',
  'vite.config.ts',
  'vite.config.server.ts',
  'tsconfig.json',
  'tailwind.config.ts',
  'client/App.tsx',
  'client/pages/Index.tsx',
  'client/pages/About.tsx',
  'client/pages/NotFound.tsx',
  'client/components/Layout.tsx',
  'client/components/ThemeProvider.tsx',
  'client/components/ThemeToggle.tsx',
  'server/index.ts',
  'server/node-build.ts',
  'server/routes/demo.ts',
  'server/routes/translate.ts',
  'shared/api.ts',
  'netlify/functions/api.ts'
];

const requiredDirs = [
  'client',
  'server', 
  'shared',
  'netlify/functions',
  'client/components/ui',
  'client/lib',
  'client/hooks'
];

console.log('🔍 Checking project structure...\n');

let allGood = true;

// Check directories
console.log('📁 Checking directories:');
for (const dir of requiredDirs) {
  const exists = existsSync(dir);
  console.log(`  ${exists ? '✅' : '❌'} ${dir}`);
  if (!exists) allGood = false;
}

console.log('\n📄 Checking required files:');
for (const file of requiredFiles) {
  const exists = existsSync(file);
  console.log(`  ${exists ? '✅' : '❌'} ${file}`);
  if (!exists) allGood = false;
}

console.log('\n🔧 Project structure check:', allGood ? '✅ PASSED' : '❌ FAILED');

if (allGood) {
  console.log('\n🚀 Ready to run:');
  console.log('  npm run dev     - Start development server');
  console.log('  npm run build   - Build for production');
  console.log('  npm run start   - Start production server');
} else {
  console.log('\n⚠️  Some files are missing. Please check the structure.');
}