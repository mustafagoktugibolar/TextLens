import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// ⚠️ vueDevTools geçici olarak kaldırıldı çünkü bu tür hata genelde ondan gelir

export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      input: 'src/content-widget.js',
      output: {
        format: 'iife',
        entryFileNames: 'widget.js'
      }
    },
    inlineDynamicImports: false
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
