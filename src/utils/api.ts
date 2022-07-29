import axios from './axios'

export const getUserPosts = (id: number) => axios.get(`/posts/list/account=${id}/`).then(({ data }: any) => data)
export const getAllPosts = () => axios.get('/posts/explorer/').then(({ data }: any) => data)
export const getFollowersPosts = () => axios.get('/posts/home/').then(({ data }) => data)
export const getPost = (id: number) => axios.get(`/posts/retrieve/post=${id}/`).then(({ data }: any) => data)
export const getAccountInformation = (id: number) => axios.get(`/account/account-details/${id}/`).then(({ data }: any) => data)
export const getComments = (id:number) => axios.get(`comments/list/post=${id}/`).then(({ data }) => data)
export const getArchivedPosts = () => axios.get('/archives/list/').then(({ data }) => data)
export const getFollowers = (id: number) => axios.get(`/follows/follower/list/account=${id}/`).then(({ data }) => data)
export const getFollowing = (id: number) => axios.get(`/follows/following/list/account=${id}/`).then(({ data }) => data)
export const getUsersByList = (list: any) => axios.post('/account/list-account-data/', { accounts_id: list }).then(({ data }:any) => data)
export const getPostLikes = (id: any) => axios.get(`/likes/list/post=${id}/`).then(({ data }:any) => data)
