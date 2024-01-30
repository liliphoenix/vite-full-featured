import { createRouter, createWebHashHistory } from 'vue-router'
import { basicRoutes } from './basicRoutes'
import { getToken } from '@/utils'

export const router = createRouter({
  routes: basicRoutes,
  history: createWebHashHistory()
})

// 全局路由守卫
router.beforeEach((to, from, next) => {
  const token = getToken()
  if (token === null) {
    if (to.name === 'login') {
      next()
    } else {
      next({ path: 'login' })
    }
  } else {
    next()
  }
})
