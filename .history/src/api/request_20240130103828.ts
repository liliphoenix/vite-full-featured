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
  // todo:token在请求拦截器的优化
  (config: InternalAxiosRequestConfig) => {
    // if (token === '') {
    //   config.headers.Authorization = `Bearer ${token}`
    // }
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
