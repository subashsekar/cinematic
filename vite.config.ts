import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/cinematic/',
  plugins: [react(), tailwindcss()],
  server: {
    watch: {
      // Avoid EBUSY crashes when large/locked media files are being copied
      ignored: ['**/public/video/**', '**/public/audio/**', '**/public/photos/**'],
    },
  },
})
