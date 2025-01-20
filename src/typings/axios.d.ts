import 'axios'

export interface ApiResponse<T = unknown> {
  code: number
  data: T
  message: string
  success: boolean
}

declare module 'axios' {
  export interface AxiosRequestConfig {
    showLoading?: boolean
  }

  export interface AxiosResponse<T = unknown> {
    data: ApiResponse<T>
  }
}
