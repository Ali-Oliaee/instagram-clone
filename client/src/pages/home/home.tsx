/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { useEffect } from 'react'
import { Header, PostCard } from '../../components'
import axios from '../../utils/axios'
import './style.scss'

const samplePosts = [{
  id: '1',
  title: 'Sample Post',
  description: 'Sample Describe lorem8  ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  creator: 'ali',
  tags: ['tag1'],
  likes: ['mmd', 'jafar'],
  image: 'https://picsum.photos/200/300',
  createdAt: '2020-01-01',
},
{
  id: '2',
  title: 'Sample Post2',
  description: 'Sample Describe2',
  creator: 'sina',
  tags: ['tag1', 'tag2'],
  likes: ['mmd', 'jafar'],
  image: 'https://picsum.photos/200/500',
  createdAt: '2020-01-01',
},
{
  id: '2',
  title: 'Sample Post2',
  description: 'Sample Describe2',
  creator: 'sina',
  tags: ['tag1', 'tag2'],
  likes: ['mmd', 'jafar'],
  image: 'https://picsum.photos/200/400',
  createdAt: '2020-01-01',
},
{
  id: '2',
  title: 'Sample Post2',
  description: 'Sample Describe2',
  creator: 'sina',
  tags: ['tag1', 'tag2'],
  likes: ['mmd', 'jafar'],
  image: 'https://picsum.photos/300/400',
  createdAt: '2020-01-01',
},
{
  id: '2',
  title: 'Sample Post2',
  description: 'Sample Describe2',
  creator: 'sina',
  tags: ['tag1', 'tag2'],
  likes: ['mmd', 'jafar'],
  image: 'https://picsum.photos/200/100',
  createdAt: '2020-01-01',
},
]

function HomePage() {
  // TODO: use media query
  const getPosts = () => {
    axios.get('/posts/').then((res) => {
      console.log(res)
    })
  }
  useEffect(() => {
    getPosts()
  }, [])
  return (
    <div className="home-page">
      <Header />
      <div className="posts-container">
        {samplePosts.map((post) => (
          <PostCard
            key={post.id}
            title={post.title}
            description={post.description}
            creator={post.creator}
            tags={post.tags}
            likes={post.likes}
            image={post.image}
            createdAt={post.createdAt}
            id={post.id}
          />
        ))}
      </div>
    </div>
  )
}

export default HomePage
