import type { App } from 'vue'
import type { NavigationGuardNext, RouteLocationNormalized, RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

const routes: RouteRecordRaw[] = []
const modules = import.meta.glob('./routes/*.ts', { eager: true })
Object.keys(modules).forEach((key) => {
  routes.push(...(modules[key] as IRouterModule).default)
})

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  next()
})

export async function setupRouter(app: App) {
  app.use(router)
  await router.isReady()
}

export default router
