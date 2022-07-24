import { useQueryClient } from 'react-query'
import axios from '../utils/axios'

const usePost = () => {
  const queryClient = useQueryClient()

  const addPost = ({
    title, file, caption, tags, enableComments = true,
  } : any) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('title', title)
    formData.append('caption', caption)
    formData.append('comment_status', enableComments)
    tags.forEach((tag: any) => formData.append('tags', tag))

    return axios.post(
      '/posts/create/',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    )
  }

  const editPost = ({
    title, caption, tags, id, enableComments,
  } : any) => axios.patch(`/posts/list/post=${id}/`, {
    title,
    caption,
    tags,
    comment_status: enableComments,
  })

  const deletePost = (id : number) => axios.delete(`posts/list/post=${id}/`)

  const likePost = (account: any, post: any) => axios.post('/likes/create/', { account, post }).then(() => queryClient.invalidateQueries('post'))
  const archivePost = (account: any, post: any) => axios.post('/archives/create/', { account, post }).then(() => {
    queryClient.invalidateQueries('post')
    queryClient.invalidateQueries('archivePosts')
  })
  const unLikePost = (account: any, post: any) => axios.delete(`/likes/destroy/account=${account}/post=${post}/`).then(() => queryClient.invalidateQueries('post'))
  const unArchivePost = (account: any, post: any) => axios.delete(`/archives/destroy/account=${account}/post=${post}/`).then(() => {
    queryClient.invalidateQueries('post')
    queryClient.invalidateQueries('archivePosts')
  })

  return {
    addPost,
    editPost,
    deletePost,
    likePost,
    archivePost,
    unLikePost,
    unArchivePost,
  }
}

export default usePost
