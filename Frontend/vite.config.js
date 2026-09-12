import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

  server: {
    port: 7180,
    host: "192.168.0.121",
  },

  resolve: {
    alias: {
      "@": "/src",
    },
  }
})
