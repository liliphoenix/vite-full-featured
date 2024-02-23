import type {
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError
} from 'axios'

// 🌸 自定义请求头方法
export type setHeadersType = (
  config: InternalAxiosRequestConfig,
  key: string,
  value: string
) => InternalAxiosRequestConfig

// 🌸 axios返回的基本数据类型
export interface resType<T> {
  result_code: number
  data: T
}

// 🌸 可扩展config
export interface Request extends AxiosRequestConfig {
  interceptors?: interceptorsObj
  useDefaultReq?: boolean
  useDefaultRes?: boolean
}
export interface interceptorsObj {
  requestInterceptors?: (
    config: InternalAxiosRequestConfig
  ) => InternalAxiosRequestConfig
  requestInterceptorsRej?: (error: AxiosError) => void
  responseInterceptorsRej?: (error: AxiosError) => void
  responseInterceptors?: (config: AxiosResponse) => AxiosResponse
}
