/* eslint-disable max-len */
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
  ({ response }) => {
    // todo: fix keys (message for all)
    if (response.status === 401) message.error(response.data.message ?? response.data.email ?? response.data.password)

    // todo: fix keys (message for all)
    else if (response.status === 400) message.error(response.data.message ?? response.data.email ?? response.data.password)

    return Promise.reject(response)
  },
)

export default instance
