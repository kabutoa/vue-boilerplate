import type { App } from 'vue'
import { createPinia } from 'pinia'

const store = createPinia()

// 挂载到app上
export function setupStore(app: App) {
  app.use(store)
}

export { store }
