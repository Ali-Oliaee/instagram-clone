/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-sequences */
/* eslint-disable no-unused-expressions */
import { message } from 'antd'
import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

instance.interceptors.request.use((config: any) => {
  const token = JSON.parse(localStorage.getItem('user') ?? '{}')?.tokens?.access
  // eslint-disable-next-line no-param-reassign
  config.headers.Authorization = token && `Bearer ${token}`
  return config
})
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      return axios
        .post('api/token/refresh/', {
          refresh_token: JSON.parse(localStorage.getItem('user') as any)?.tokens?.refresh,
        })
        .then((response) => {
          if (response.status === 200 || response.status === 204) localStorage.setItem('user', response.data)
          else if (response.status === 401) {
            message.error(
              'You have been logged out because of an invalid refresh token!',
            )
            localStorage.clear()
            return Promise.reject(error)
          }
          return response
        })
    } if (error.response.status === 503) {
      message.error('Server is down for maintenance')
      return error
    }
    message.error(error.response.message)
    return error
  },
)

export default instance
