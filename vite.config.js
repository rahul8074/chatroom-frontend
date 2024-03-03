// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/api': 'https://chatroom-backend-ntl5.onrender.com:10000' // Replace with your backend URL
    }
  }
});
