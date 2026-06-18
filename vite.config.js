import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // If deploying to https://USERNAME.github.io/REPO_NAME/, set this to '/REPO_NAME/'
  base: './',
});
