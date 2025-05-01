
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { componentTagger } from "lovable-tagger"
import path from 'path'
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    tailwindcss(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  server: {
    port: 8080,
    host: "::"
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}))
