import { PostCard } from '../post-card'
import './style.scss'

function PostsWrapper({ posts }: any) {
  return (
    <div className="posts-wrapper">
      {posts.map((post : any) => (
        <PostCard
          key={post.id}
          id={post.id}
          title={post.title}
          caption={post.caption}
          creator={post.account?.user.username}
          tags={post.tags}
          likes={post.likes ?? []}
          image={post.file}
          createdAt={post.created_at}
          updatedAt={post.updated_at}
        />
      ))}
    </div>
  )
}
export default PostsWrapper
