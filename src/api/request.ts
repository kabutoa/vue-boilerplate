import type { AxiosRequestConfig } from 'axios'
import axios from 'axios'

const instance = axios.create({
  /**
   * import.meta.env.MODE === 'production'
      ? import.meta.env.VITE_API_URL
      : 'http://localhost:3000/api',
   *
   */
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
})

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    return response.data.data
  },
  (error) => {
    console.error(error.message)
    return Promise.reject(error)
  },
)

function request<T>(config: AxiosRequestConfig): Promise<T> {
  if (config.method === 'GET') {
    config.params = config.data
    delete config.data
  }
  if (config.method === 'POST') {
    config.headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    }
  }
  return instance(config)
}

export default request
