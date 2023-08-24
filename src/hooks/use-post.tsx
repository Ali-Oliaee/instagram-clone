import { useQueryClient } from 'react-query'
import axios from '../utils/axios'
import { AddPost, EditPost } from '../types/post'

const usePost = () => {
  const queryClient = useQueryClient()

  const addPost = ({
    title, file, caption, tags, enableComments = true,
  } : AddPost) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('title', title)
    formData.append('caption', caption)
    formData.append('comment_status', enableComments as any)
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
  } : EditPost) => axios.patch(`/posts/list/post=${id}/`, {
    title,
    caption,
    tags,
    comment_status: enableComments,
  })

  const deletePost = (id : number) => axios.delete(`posts/list/post=${id}/`)

  const likePost = (account: number, post: number) => axios.post('/likes/create/', { account, post }).then(() => queryClient.invalidateQueries('post'))
  const archivePost = (account: number, post: number) => axios.post('/archives/create/', { account, post }).then(() => {
    queryClient.invalidateQueries('post')
    queryClient.invalidateQueries('postsWrapper')
  })
  const unLikePost = (account: number, post: number) => axios.delete(`/likes/destroy/account=${account}/post=${post}/`).then(() => queryClient.invalidateQueries('post'))
  const unArchivePost = (account: number, post: number) => axios.delete(`/archives/destroy/account=${account}/post=${post}/`).then(() => {
    queryClient.invalidateQueries('post')
    queryClient.invalidateQueries('postsWrapper')
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
