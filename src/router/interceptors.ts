import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

export async function routerBeforeEachFunc(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
  // 路由进入前的操作
  next()
}

export function routerAfterEachFunc(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
  // 路由进入后的操作
  next()
}
