import { Empty } from 'antd'
import { Comments } from '../comments'
import { PostCard } from '../post-card'
import './style.scss'

function PostsWrapper({ posts }: any) {
  return (
    <div className="posts-wrapper">
      {posts.length ? posts.map((post : any) => (
        <PostCard
          key={post.id}
          id={post.id}
          title={post.title}
          caption={post.caption}
          creator={post.account}
          tags={post.tags}
          likes={post.likes ?? []}
          image={post.file}
          createdAt={post.created_at}
          updatedAt={post.updated_at}
        />
      )) : <Empty className="empty" />}
      <Comments />
    </div>
  )
}
export default PostsWrapper
