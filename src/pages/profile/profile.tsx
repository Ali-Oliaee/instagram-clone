import { EditOutlined } from '@ant-design/icons'
import { Avatar, Button } from 'antd'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'
import { Header, PostsWrapper } from '../../components'
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
  tags: ['tag31', 'tag32'],
  likes: ['mmd', 'jafar'],
  image: 'https://picsum.photos/200/400',
  createdAt: '2020-01-01',
},
{
  id: '4',
  title: 'Sample Post2',
  description: 'Sample Describe2 giurth giuthgir ughjkdnv vjfkdvnkdv kvunkdfn dfnvhdvb vjfdvbjdfvb vjfvb cjdvbjhbvfjdbv',
  creator: 'sina',
  tags: ['tag41', 'tag42'],
  likes: ['mmd', 'jafar'],
  image: 'https://picsum.photos/300/400',
  createdAt: '2020-01-01',
}]

function profilePage() {
  const location = useLocation()
  const { t } = useTranslation()
  const userId = +location.pathname.split('/')[2]

  return (
    <div className="profile-page">
      <Header />
      <div className="profile-info">
        <Avatar src={require('../../assets/images/default-user.jpg')} size="large" className="avatar" />
        <div>
          <div className="profile-header">
            <span className="username">username</span>
            {userId !== -1 ? (
              <Button type="primary" size="small" className="edit-button">
                {t('follow')}
              </Button>
            ) : (
              <Link to="/settings">
                <Button size="small" icon={<EditOutlined />} className="edit-button">Edit profile</Button>
              </Link>
            )}
          </div>
          <div className="report">
            <span className="posts">
              <strong>1200 </strong>
              posts
            </span>
            <span className="follower">
              <strong>125 </strong>
              followers
            </span>
            <span className="following">
              <strong>984 </strong>
              following
            </span>
          </div>
          <div className="bio">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor exercitationem atque dolore omnis obcaecati ipsa officia esse blanditiis fugiat dignissimos saepe et sunt aut quia, ut repudiandae tenetur? Ducimus, voluptatum!</div>
        </div>
      </div>
      <PostsWrapper posts={samplePosts} />
    </div>
  )
}

export default profilePage
