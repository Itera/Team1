import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'happy-dom',
  },
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./frontend', import.meta.url)),
      '@': fileURLToPath(new URL('./frontend', import.meta.url)),
      '/face.svg': fileURLToPath(new URL('./frontend/public/face.svg', import.meta.url)),
    },
  },
})
