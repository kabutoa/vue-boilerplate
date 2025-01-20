import process from 'node:process'
import { fileURLToPath, URL } from 'node:url'
import legacy from '@vitejs/plugin-legacy'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { visualizer } from 'rollup-plugin-visualizer'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig, loadEnv, mergeConfig, type UserConfig } from 'vite'
import compression from 'vite-plugin-compression2'
import vueDevTools from 'vite-plugin-vue-devtools'

import { name } from './package.json'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const isProd = mode === 'production'

  const baseConfig = {
    plugins: [vue(), vueJsx(), AutoImport({
      imports: [
        'vue',
        {
          'vue-router': ['useRouter'],
        },
        'pinia',
      ],
    })],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    preview: {
      port: 8888,
      host: '0.0.0.0',
    },
  } as UserConfig

  if (!isProd) {
    return mergeConfig(baseConfig, {
      base: env.VITE_BASE_URL,
      plugins: [vueDevTools()],
      server: {
        port: 8080,
        host: '0.0.0.0',
        proxy: {
          [`${env.VITE_API_PREFIX}`]: {
            target: env.VITE_MOCK_PATH,
            changeOrigin: true,
          },
        },
      },
    } as UserConfig)
  }

  return mergeConfig(baseConfig, {
    base: `${env.VITE_CDN_PATH}${name}`,
    plugins: [legacy(), compression(), visualizer({
      open: true,
    })],
    build: {
      sourcemap: false,
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          // 手动分包
          manualChunks: {
            'vue-vendor': ['vue', 'pinia', 'vue-router'],
          },
          chunkFileNames: 'js/[name]-[hash].js',
          entryFileNames: 'js/[name]-[hash].js',
          assetFileNames: ({ name }: { name?: string }) => {
            if (name && /\.css$/.test(name)) {
              return 'css/[name]-[hash][extname]'
            }
            return 'assets/[name]-[hash][extname]'
          },
        },
      },
      // 构建优化
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true, // 生产环境去除 console
          drop_debugger: true, // 生产环境去除 debugger
        },
      },
    },
  } as UserConfig)
})
