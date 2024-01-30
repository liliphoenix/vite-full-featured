import type {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig
} from 'axios'

type setHeadersType = (
  config: InternalAxiosRequestConfig,
  key: string
) => InternalAxiosRequestConfig
