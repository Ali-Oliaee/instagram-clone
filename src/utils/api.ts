import axios from './axios'

export const fetchPosts = () => axios.get('/posts/list/').then(({ data }: any) => data)
export const getPost = (id: number) => axios.get(`/posts/list/${id}/`).then(({ data }: any) => data)
