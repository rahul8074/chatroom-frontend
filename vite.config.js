// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/api': 'https://chatroom-backend-ntl5.onrender.co' // Replace with your backend URL
    }
  }
});
