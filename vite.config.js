import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

var process = {
  env: {
    NODE_ENV: 'production'
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  base: '/gemini-comp/',
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === "production" ? "/gemini-comp/" : "/",
  plugins: [
    vue(),
    vueJsx(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
