import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

const app = createApp(App)

if (import.meta.env.VITE_MOCK) {
  import('./mock')
}

app.use(createPinia())
app.use(router)

app.mount('#app')
