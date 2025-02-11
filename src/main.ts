import { createApp } from 'vue'
import App from './App.vue'

import { setupRouter } from './router'
import { setupStore } from './store'

if (import.meta.env.VITE_MOCK) {
  import('./mock')
}

async function setupApp() {
  const app = createApp(App)

  setupStore(app)
  await setupRouter(app)
  app.mount('#app')
}

setupApp()
