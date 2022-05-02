import { PostCard } from '../post-card'
import './style.scss'

interface Post {
  title: string
  description: string
  creator: string,
  tags: Array<string>,
  likes: Array<string>,
  image: string,
  createdAt?: string,
  id: string,
}

interface PostProp {
  posts: Array<Post>
}

function PostsWrapper({ posts }: PostProp) {
  return (
    <div className="posts-wrapper">
      {posts.map((post : Post) => (
        <PostCard
          key={post.id}
          title={post.title}
          description={post.description}
          creator={post.creator}
          tags={post.tags}
          likes={post.likes}
          image={post.image}
          createdAt={post.createdAt ?? Date()}
          id={post.id}
        />
      ))}
    </div>
  )
}
export default PostsWrapper
