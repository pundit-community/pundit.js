import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'pundit'
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['react']
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './test-setup.js',
    // you might want to disable it, if you don't have tests that rely on CSS
    // since parsing CSS is slow
    css: false
  }
})
