import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // 同时监听 IPv4 / IPv6，避免仅 [::1] 时浏览器走 127.0.0.1 出现 ERR_CONNECTION_REFUSED
  server: {
    host: true,
    port: 5173,
    strictPort: false,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
