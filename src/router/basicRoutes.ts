import type { routeRaw } from '@/types'
import Home from '@/view/Home.vue'
import errPage from '@/view/404Page.vue'
import Login from '@/view/Login.vue'

export const basicRoutes: routeRaw[] = [
  {
    path: '/',
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: Home,
        name: 'name',
        meta: {
          role: 0
        }
      },
      {
        path: '/login',
        component: Login,
        name: 'login',
        meta: {
          role: 0
        }
      },
      {
        path: '/404',
        component: errPage,
        name: '404',
        meta: {
          role: 0
        }
      }
    ]
  }
]
