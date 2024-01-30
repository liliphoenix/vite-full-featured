import type { InternalAxiosRequestConfig } from 'axios'

type setHeadersType = (
  config: InternalAxiosRequestConfig,
  key: string
) => InternalAxiosRequestConfig
