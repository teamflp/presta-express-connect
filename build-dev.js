
// Simple script to handle development build
console.log('Starting development build...');
const { execSync } = require('child_process');

try {
  // Using vite build instead of tsc --build to avoid TypeScript compiler conflicts
  execSync('vite build --mode development', { stdio: 'inherit' });
  console.log('Development build completed successfully.');
} catch (error) {
  console.error('Development build failed:', error);
  process.exit(1);
}
