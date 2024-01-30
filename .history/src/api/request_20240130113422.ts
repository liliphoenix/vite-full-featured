import axios from 'axios'
import type {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig
} from 'axios'
import type { setHeadersType } from '@/types/axios'

export const request: AxiosInstance = axios.create({
  baseURL: 'xxx',
  timeout: 3000
})
request.interceptors.request.use(
  // TODO:token在请求拦截器的优化
  (config: InternalAxiosRequestConfig) => {
    // 🌸 0.检查用户的网络连接状态
    if (!navigator.onLine) {
    }
    // 🌸 1.token 用户身份验证
    const token: string | null = localStorage.getItem('token')
    token !== null && (config.headers.Authorization = token)
    // 🌸 2.自定义请求头
    config = setHeaders(config, 'myHeader', 'this is my header')
    return config
  },
  async (err: AxiosError) => {
    return await Promise.reject(err)
  }
)

request.interceptors.response.use(
  (res) => {
    return res
  },
  (err: AxiosError) => {
    return err
  }
)

// 🌸 自定义添加请求头

const setHeaders: setHeadersType = (
  config: InternalAxiosRequestConfig,
  key: string,
  value: string
) => {
  config.headers[key] = value
  return config
}
