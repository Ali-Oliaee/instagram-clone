import { useEffect } from 'react'
import qs from 'query-string'
import {
  AddPostModal, Header, PostsWrapper,
} from '../../components'
import axios from '../../utils/axios'
import './style.scss'

const samplePosts = [{
  id: '1',
  title: 'Sample Post',
  description: 'Sample Describe lorem8  ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  creator: 'ali',
  tags: ['tag1', 'tag2', 'tag3', 'tag4', 'tag5', 'tag6', 'tag7', 'tag8', 'tag9', 'tag10'],
  likes: ['mmd', 'jafar'],
  image: 'https://picsum.photos/200/300',
  createdAt: '2020-01-01',
},
{
  id: '2',
  title: 'Sample Post2',
  description: '',
  creator: 'sina',
  tags: ['tag11', 'tag12'],
  likes: ['mmd', 'jafar'],
  image: 'https://picsum.photos/200/500',
  createdAt: '2020-01-01',
},
{
  id: '3',
  title: 'Sample Post2',
  description: 'Sample Describe2',
  creator: 'sina',
  tags: ['tag21', 'tag22'],
  likes: ['mmd', 'jafar'],
  image: 'https://picsum.photos/200/400',
  createdAt: '2020-01-01',
},
{
  id: '4',
  title: 'Sample Post2',
  description: 'Sample Describe2 giurth giuthgir ughjkdnv vjfkdvnkdv kvunkdfn dfnvhdvb vjfdvbjdfvb vjfvb cjdvbjhbvfjdbv',
  creator: 'sina',
  tags: ['tag31', 'tag32'],
  likes: ['mmd', 'jafar'],
  image: 'https://picsum.photos/300/400',
  createdAt: '2020-01-01',
},
{
  id: '5',
  title: 'Sample Post2',
  description: 'Sample Describe2',
  creator: 'sina',
  tags: ['tag41', 'tag42'],
  likes: ['mmd', 'jafar'],
  image: 'https://picsum.photos/200/100',
  createdAt: '2020-01-01',
},
]

function HomePage() {
  const QS = qs.parse(window.location.search)
  // TODO: use media query
  // const getPosts = () => {
  //   axios.get('/posts/').then((res) => {
  //     console.log(res)
  //   })
  // }
  // useEffect(() => {
  //   getPosts()
  // }, [])
  return (
    <div className="home-page">
      <Header />
      <PostsWrapper posts={samplePosts} />
      <AddPostModal />
    </div>
  )
}

export default HomePage
