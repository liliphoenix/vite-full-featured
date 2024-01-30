import type { InternalAxiosRequestConfig } from 'axios'

// 🌸 自定义请求头方法
export type setHeadersType = (
  config: InternalAxiosRequestConfig,
  key: string,
  value: string
) => InternalAxiosRequestConfig
