import { PostCard } from '../post-card'
import { useMediaQuery } from 'usehooks-ts'
import './style.scss'
import { Image } from 'antd'

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
  const isMobile = useMediaQuery('(max-width: 500px)')

  return (
    <div className={isMobile ? "posts-wrapper-mobile" : "posts-wrapper-desktop"}>
      {isMobile ? posts.map((post : Post) => (
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
      )
      ) : posts.map((post : Post) => (
            <Image
              key={post.id}
              src={post.image}
              alt={post.title}
              width={200}
              height={200}
              />
          ))
      }
    </div>
  )
}
export default PostsWrapper
