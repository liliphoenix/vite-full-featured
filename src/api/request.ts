import axios from 'axios'
import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  AxiosResponse
} from 'axios'
import type * as AT from 'types/axios'

export const request: AxiosInstance = axios.create({
  baseURL: 'xxx',
  timeout: 3000
})
export class Request {
  instance: AxiosInstance
  interceptorsObj: AT.interceptorsObj
  constructor(config: AT.Request) {
    // 🌸 创建实例
    this.instance = axios.create(config)
    // 🌸 可传入拦截器
    if (config.interceptors) {
      this.interceptorsObj = config.interceptors
      this.instance.interceptors.request.use(
        config.interceptors?.requestInterceptors,
        config.interceptors?.requestInterceptorsRej
      )
      this.instance.interceptors.response.use(
        config.interceptors.responseInterceptors,
        config.interceptors?.responseInterceptorsRej
      )
    }

    // 🌸 请求拦截器封装
    // ! 新版本中请求拦截器的类型已经是 InternalAxiosRequestConfig
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // 🌸 0.检查用户的网络连接状态
        if (!navigator.onLine) {
          throw new Error('network did not connected')
        }
        // 🌸 1.token 用户身份验证
        const token = localStorage.getItem('token')
        if (token === undefined) {
          config.headers.Authorization = token
        }
        // 🌸 2.自定义请求头
        config = setHeaders(config, 'myHeader', 'this is my header')
        return config
      },
      (error) => {
        console.log(error)
        throw new Error(error.message)
      }
    )
    // 🌸 响应拦截器封装
    this.instance.interceptors.response.use(
      (config: AxiosResponse) => {
        return config
      },
      (error: AxiosError) => {
        console.log(error)
        throw new Error(error.message)
      }
    )
    // 🌸 自定义添加拦截器
  }

  // 🌸 request方法
  request(config: AxiosRequestConfig): Promise<AT.resType<any>> {
    return this.instance.request(config)
  }
}

// 🌸 自定义添加请求头
const setHeaders: AT.setHeadersType = (
  config: InternalAxiosRequestConfig,
  key: string,
  value: string
) => {
  config.headers[key] = value
  return config
}
