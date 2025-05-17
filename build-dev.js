
// Simple script to handle development build
console.log('Starting development build...');
const { execSync } = require('child_process');

try {
  // Set environment variables to disable declaration file generation
  process.env.TS_NODE_COMPILER_OPTIONS = JSON.stringify({ 
    declaration: false,
    emitDeclarationOnly: false,
    skipLibCheck: true,
    skipDefaultLibCheck: true
  });
  
  // Using vite build directly with explicit config to avoid TypeScript compiler conflicts
  execSync('vite build --mode development --config vite.config.ts', { 
    stdio: 'inherit',
    env: {
      ...process.env,
      TS_NODE_COMPILER_OPTIONS: JSON.stringify({ 
        declaration: false,
        emitDeclarationOnly: false,
        skipLibCheck: true,
        skipDefaultLibCheck: true
      }),
      TS_NODE_SKIP_PROJECT: "true",
      TS_NODE_TRANSPILE_ONLY: "true"
    }
  });
  console.log('Development build completed successfully.');
} catch (error) {
  console.error('Development build failed:', error);
  process.exit(1);
}
