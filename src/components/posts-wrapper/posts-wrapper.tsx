import { Empty } from 'antd'
import qs from 'query-string'
import { PostCard } from '../post-card'
import { Comments } from '../comments'
import { EditPostModal, PostModal, LikedUsersList } from '../modals'
import './style.scss'

function PostsWrapper({ posts, refetch }: any) {
  const QS = qs.parse(window.location.search)
  return (
    <div className={posts?.length ? 'posts-wrapper__full' : 'posts-wrapper__empty'}>
      {posts?.length ? posts.map((post : any) => (
        <PostCard
          key={post?.id}
          id={post?.id}
          title={post?.title}
          caption={post?.caption}
          account={post?.account}
          tags={post?.tags}
          account_likes={post?.account_likes}
          account_archives={post?.account_archives}
          file={post?.file}
          created_at={post?.created_at}
          updated_at={post?.updated_at}
          comment_status={post?.comment_status}
          refetch={refetch}
        />
      )) : <Empty />}
      {QS.comments && <Comments />}
      {QS.edit && <EditPostModal />}
      {QS.post && <PostModal />}
      {QS.likes && <LikedUsersList />}
    </div>
  )
}
export default PostsWrapper
