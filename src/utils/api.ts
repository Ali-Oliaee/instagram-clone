import axios from './axios'

export const getUserPosts = (id: number) => axios.get(`/posts/list/account=${id}/`).then(({ data }: any) => data)
export const getAllPosts = () => axios.get('/posts/explorer/').then(({ data }: any) => data)
export const getFollowersPosts = () => axios.get('/posts/home/').then(({ data }) => data)
export const getPost = (id: number) => axios.get(`/posts/list/post=${id}/`).then(({ data }: any) => data)
export const getAccountInformation = (id: number) => axios.get(`/account/account-details/${id}/`).then(({ data }: any) => data)
export const getComments = (id:number) => axios.get(`comments/list/${id}/`).then(({ data }) => data)
export const getArchivedPosts = () => axios.get('/archives/list/').then(({ data }) => data)
