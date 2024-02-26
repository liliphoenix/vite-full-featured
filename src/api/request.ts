import axios from 'axios'
import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  AxiosResponse
} from 'axios'
import type * as AT from 'types/axios'

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
      (config: AT.requestInterceptors) => {
        const { selfHeader } = config
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
        if (selfHeader) {
          Object.keys(selfHeader).forEach((key) => {
            if (key === 'Content-Type') {
              config.headers['Content-Type'] = selfHeader[key]
              return
            }
            config = setHeaders(config, key, selfHeader[key])
          })
        }

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
      // 🌸 处理拦截器
      (error: AxiosError) => {
        console.log(error)
        let message
        switch (error.response?.status) {
          case 400:
            message = '请求错误(400)'
            break
          case 401:
            message = '未授权，请重新登录(401)'
            // 这里可以做清空storage并跳转到登录页的操作
            break
          case 403:
            message = '拒绝访问(403)'
            break
          case 404:
            message = '请求出错(404)'
            break
          case 408:
            message = '请求超时(408)'
            break
          case 500:
            message = '服务器错误(500)'
            break
          case 501:
            message = '服务未实现(501)'
            break
          case 502:
            message = '网络错误(502)'
            break
          case 503:
            message = '服务不可用(503)'
            break
          case 504:
            message = '网络超时(504)'
            break
          case 505:
            message = 'HTTP版本不受支持(505)'
            break
          default:
            message = `连接出错(${error.response?.status})!`
        }
        console.log(message)

        throw new Error(message)
      }
    )
    // 🌸 自定义添加拦截器
  }

  // 🌸 request方法
  // eslint-disable
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
