// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/api': 'https://vc-backend-oih5.onrender.com' // Replace with your backend URL
    }
  }
});