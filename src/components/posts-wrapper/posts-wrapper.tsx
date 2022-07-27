/* eslint-disable no-nested-ternary */
import { Empty, Image } from 'antd'
import qs from 'query-string'
import { useMediaQuery } from 'usehooks-ts'
import { useSearchParams } from 'react-router-dom'
import { PostCard } from '../post-card'
import { Comments } from '../comments'
import { EditPostModal, PostModal, LikedUsersList } from '../modals'
import './style.scss'

function PostsWrapper({ posts, refetch }: any) {
  const isMobile = useMediaQuery('(max-width: 500px)')
  const [searchParams, setSearchParams] = useSearchParams()
  const QS = qs.parse(window.location.search)

  return (
    <div className={posts?.length ? 'posts-wrapper__full' : 'posts-wrapper__empty'}>
      { posts?.length ? posts.map((post : any) => (
        // eslint-disable-next-line react/jsx-props-no-spreading
        isMobile ? <PostCard key={post?.id} refetch={refetch} {...post} />
          : (
            <Image
              key={post?.id}
              src={post?.file}
              alt={post?.title}
              className="post-image"
              height={150}
              width={200}
              onClick={() => setSearchParams(`post=${post?.id}`)}
              preview={false}
            />
          )
      )) : <Empty />}
      {QS.comments && <Comments />}
      {QS.edit && <EditPostModal />}
      {QS.post && <PostModal />}
      {QS.likes && <LikedUsersList />}
    </div>
  )
}
export default PostsWrapper
