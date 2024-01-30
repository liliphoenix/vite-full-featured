import type { InternalAxiosRequestConfig } from 'axios'

export type setHeadersType = (
  config: InternalAxiosRequestConfig,
  key: string
) => InternalAxiosRequestConfig
