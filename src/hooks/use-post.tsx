import { message } from 'antd'
import { useQueryClient } from 'react-query'
import { useSearchParams } from 'react-router-dom'
import axios from '../utils/axios'

const usePost = () => {
  const queryClient = useQueryClient()
  const [searchParams, setSearchParams] = useSearchParams()

  const addPost = ({
    title, file, caption, tags, enableComments = true,
  } : any) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('title', title)
    if (caption) formData.append('caption', caption)
    formData.append('comment_status', enableComments)
    if (tags?.length)tags.forEach((tag: any) => formData.append('tags', tag))

    return axios.post(
      '/posts/create/',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    ).then(() => {
      message.success('file uploaded successfully.')
      queryClient.invalidateQueries('postsWrapper')
      queryClient.invalidateQueries('getCurrentUser')
      setSearchParams({})
    })
  }

  const editPost = ({
    title, caption, tags, id, enableComments,
  } : any) => axios.patch(`/posts/list/post=${id}/`, {
    title,
    caption,
    tags,
    comment_status: enableComments,
  }).then(() => {
    message.success('post edited successfully!')
    queryClient.invalidateQueries('postsWrapper')
  })

  const deletePost = (id : number) => axios.delete(`posts/list/post=${id}/`).then(() => {
    queryClient.invalidateQueries('postsWrapper')
    queryClient.invalidateQueries('getCurrentUser')
    message.success('Post deleted successfully!')
    setSearchParams({})
  })

  const likePost = (account: any, post: any) => axios.post('/likes/create/', { account, post }).then(() => queryClient.invalidateQueries('post'))
  const archivePost = (account: any, post: any) => axios.post('/archives/create/', { account, post }).then(() => {
    queryClient.invalidateQueries('post')
    queryClient.invalidateQueries('postsWrapper')
  })
  const unLikePost = (account: any, post: any) => axios.delete(`/likes/destroy/post=${post}/`).then(() => queryClient.invalidateQueries('post'))
  const unArchivePost = (post: any) => axios.delete(`/archives/destroy/post=${post}/`).then(() => {
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
