
// Simple script to handle development build
console.log('Starting development build...');
const { execSync } = require('child_process');

try {
  // Using vite build directly with explicit config to avoid TypeScript compiler conflicts
  execSync('vite build --mode development --config vite.config.ts', { stdio: 'inherit' });
  console.log('Development build completed successfully.');
} catch (error) {
  console.error('Development build failed:', error);
  process.exit(1);
}
