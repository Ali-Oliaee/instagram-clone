import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
  headers: {
    authorization: `Bearer ${JSON.parse(localStorage.getItem('user') || '{}').tokens.access}`,
    'Content-Type': 'application/json',
  },
})

export default instance
