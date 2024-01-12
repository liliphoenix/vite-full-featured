import type { MockMethod } from 'vite-plugin-mock'

export const mockData = [
  {
    url: '/mock/api/getList',
    method: 'get',
    response: () => {
      return 'ok'
    }
  },
  {
    url: 'mock/api/login',
    method: 'post',
    response: () => {
      return 'ok'
    }
  }
] as MockMethod[]
