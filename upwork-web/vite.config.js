import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// During dev, calls to /api are proxied to the Laravel backend.
// In production set VITE_API_URL + VITE_SITE_URL in .env before `npm run build`.
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const siteUrl = (env.VITE_SITE_URL || '').replace(/\/$/, '')

  return {
    plugins: [
      react(),
      {
        name: 'inject-site-url',
        transformIndexHtml(html) {
          return html.split('__SITE_URL__').join(siteUrl)
        },
      },
    ],
    server: {
      port: 5173,
      proxy: {
        '/api': { target: 'http://localhost:8000', changeOrigin: true },
      },
    },
  }
})
