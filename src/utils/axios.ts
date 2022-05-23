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

export default instance
