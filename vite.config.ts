import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          // 只在开发环境添加源代码位置属性
          process.env.NODE_ENV === 'development' 
            ? './babel-plugin-add-source-location.cjs'
            : null
        ].filter(Boolean) as string[],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    sourcemap: true, // 生成 source maps
  },
  server: {
    sourcemapIgnoreList: false, // 开发环境也启用 source maps
  },
})

