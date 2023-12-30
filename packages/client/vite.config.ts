import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import dotenv from 'dotenv';
import { fileURLToPath, URL } from 'node:url';

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
  },
  define: {
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'script',
    }),
  ],
  resolve: {
    alias: {
      src: fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
