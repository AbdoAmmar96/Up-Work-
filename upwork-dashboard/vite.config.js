import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => ({
  // في الإنتاج الدّاشبورد بيتقدّم من مجلد فرعي /dashboard/
  base: command === 'build' ? '/dashboard/' : '/',
  plugins: [react()],
  server: {
    port: 5174,
    proxy: {
      '/api': { target: 'http://localhost:8000', changeOrigin: true },
    },
  },
}))
