import { message } from 'antd'
import axios from 'axios'
import { baseURL } from './constants'

const instance = axios.create({
  baseURL,
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
    if (response.status === 401 && response.statusText === 'Unauthorized') {
      const { refresh } = JSON.parse(localStorage.getItem('user') ?? '{}').tokens
      axios.post(`${baseURL}api/token/refresh/`, { refresh }).then(({ data }) => data).then((data) => {
        const user = JSON.parse(localStorage.getItem('user') ?? '{}')
        localStorage.setItem('user', JSON.stringify({
          ...user,
          tokens: {
            ...user.tokens,
            access: data.access,
          },
        }))
      }).catch((err) => {
        message.error(err.response.data.detail)
        localStorage.clear()
        window.location.reload()
        return Promise.reject(response)
      })
    }
    // todo: fix keys (message for all)
    if (response.status === 401 || response.status === 400) {
      message.error(response.data.message ?? response.data.email ?? response.data.password)
    }

    return Promise.reject(response)
  },
)

export default instance
