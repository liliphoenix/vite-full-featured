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
  message: string
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

// 🌸 返回data的数据类型
export type dataType = Promise<resType<any>>

// 🌸 可扩展config
export interface requestInterceptors extends InternalAxiosRequestConfig {
  selfHeader?: selfHeader
}
// 🌸 自定义header
export interface selfHeader {
  'Content-Type'?:
    | 'application/x-www-form-urlencoded'
    | 'application/json'
    | 'multipart/form-data'
}
