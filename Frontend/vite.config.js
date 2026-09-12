import { defineConfig, loadEnv } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      react(),
      tailwindcss(),
    ],

    server: {
      port: Number(env.VITE_DEV_SERVER_PORT),
      host: env.VITE_DEV_SERVER_HOST || 'localhost',
    },

    resolve: {
      alias: {
        '@': '/src',
      },
    },
  }
})