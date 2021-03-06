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
  const { access } = JSON.parse(localStorage.getItem('tokens') || '{}')
  // eslint-disable-next-line no-param-reassign
  config.headers.Authorization = access && `Bearer ${access}`
  return config
})

instance.interceptors.response.use(
  (response) => response,
  ({ response }) => {
    if (response.status === 401 && response.statusText === 'Unauthorized') {
      const { refresh } = JSON.parse(localStorage.getItem('tokens') || '{}')
      axios.post(`${baseURL}api/token/refresh/`, { refresh }).then(({ data }) => data).then((data) => {
        const tokens = JSON.parse(localStorage.getItem('tokens') || '{}')
        localStorage.setItem('tokens', JSON.stringify({
          ...tokens,
          access: data.access,
        }))
      }).catch((err) => {
        message.error(err.response.data.detail)
        localStorage.clear()
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
