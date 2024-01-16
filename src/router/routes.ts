import type { routeRaw } from '@/types'
import Home from '@/App.vue'

export const routes: routeRaw[] = [
  {
    path: '/',
    redirect: '/home',
    children: [
      {
        path: '/home',
        components: Home,
        meta: {
          role: 0
        }
      }
    ]
  }
]
