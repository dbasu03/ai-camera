#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

console.log('🚀 Setting up AI Camera project...\n')

// Check if .env.local exists
const envPath = path.join(process.cwd(), '.env.local')
if (!fs.existsSync(envPath)) {
  console.log('📝 Creating .env.local file...')
  const envExample = fs.readFileSync(path.join(process.cwd(), 'env.example'), 'utf8')
  fs.writeFileSync(envPath, envExample)
  console.log('✅ Created .env.local from env.example')
  console.log('⚠️  Please edit .env.local and add your Hugging Face API key (optional)\n')
} else {
  console.log('✅ .env.local already exists\n')
}

// Check if node_modules exists
const nodeModulesPath = path.join(process.cwd(), 'node_modules')
if (!fs.existsSync(nodeModulesPath)) {
  console.log('📦 Installing dependencies...')
  console.log('Run: npm install\n')
} else {
  console.log('✅ Dependencies are installed\n')
}

console.log('🎉 Setup complete!')
console.log('\nNext steps:')
console.log('1. Run: npm install (if not already done)')
console.log('2. Edit .env.local with your API keys (optional)')
console.log('3. Run: npm run dev')
console.log('4. Open: http://localhost:3000')
console.log('\nHappy coding! 🎨')
