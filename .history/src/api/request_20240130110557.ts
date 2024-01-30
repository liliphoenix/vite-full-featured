import axios from 'axios'
import type {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig
} from 'axios'

export const request: AxiosInstance = axios.create({
  baseURL: 'xxx',
  timeout: 3000
})
request.interceptors.request.use(
  // TODO:token在请求拦截器的优化
  (config: InternalAxiosRequestConfig) => {
    // 🌸 1.token 用户身份验证
    const token: string | null = localStorage.getItem('token')
    token !== null && (config.headers.Authorization = token)
    // 🌸 2.自定义请求头

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
const setHeaders: () => InternalAxiosRequestConfig = (
  config: InternalAxiosRequestConfig,
  key: string
) => {}
