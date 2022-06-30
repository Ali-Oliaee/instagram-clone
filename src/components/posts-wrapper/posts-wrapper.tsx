import { Empty } from 'antd'
import { PostCard } from '../post-card'
import { Post } from '../../interfaces'
import { Posts } from '../../interfaces/post/post'
import './style.scss'

function PostsWrapper({ posts }: Posts) {
  return (
    <div className="posts-wrapper">
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
      )) : <Empty className="empty" />}
    </div>
  )
}
export default PostsWrapper
