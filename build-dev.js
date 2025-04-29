
// Simple script to handle development build
console.log('Starting development build...');
const { execSync } = require('child_process');

try {
  execSync('vite build --mode development', { stdio: 'inherit' });
  console.log('Development build completed successfully.');
} catch (error) {
  console.error('Development build failed:', error);
  process.exit(1);
}
