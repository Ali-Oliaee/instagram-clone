import { Empty } from 'antd'
import qs from 'query-string'
import { PostCard } from '../post-card'
import { Post } from '../../interfaces'
import { Posts } from '../../interfaces/post/post'
import { Comments } from '../comments'
import { EditPostModal, PostModal } from '../modals'
import './style.scss'

function PostsWrapper({ posts }: Posts) {
  const QS = qs.parse(window.location.search)
  return (
    <div className={posts?.length ? 'posts-wrapper__full' : 'posts-wrapper__empty'}>
      {posts?.length ? posts.map((post : Post) => (
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
        />
      )) : <Empty />}
      {QS.comments && <Comments />}
      {QS.edit && <EditPostModal />}
      {QS.post && <PostModal />}
    </div>
  )
}
export default PostsWrapper
