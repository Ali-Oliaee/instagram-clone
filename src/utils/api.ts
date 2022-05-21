import axios from './axios'

export const fetchPosts = () => axios.get('/posts/list/').then(({ data }: any) => data)
