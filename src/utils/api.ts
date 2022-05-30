import axios from './axios'

export const fetchUserPosts = () => axios.get('/posts/list/').then(({ data }: any) => data)
export const getPost = (id: number) => axios.get(`/posts/list/${id}/`).then(({ data }: any) => data)
export const getAccountInformation = () => axios.get('/account/account-details/').then(({ data }: any) => data)
export const getComments = (id:number) => axios.get(`comments/list/${id}/`).then(({ data }) => data)
