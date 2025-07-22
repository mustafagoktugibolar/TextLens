import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  plugins: [
    vue(),
    viteStaticCopy({
      targets: [
        { src: 'index.html', dest: '.' },
        { src: 'public/content.js', dest: '.' },
        { src: 'manifest.json', dest: '.' }
      ]
    })
  ],
  build: {
    rollupOptions: {
      input: 'src/content-widget.js',
      output: {
        format: 'iife',
        entryFileNames: 'widget.js'
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
