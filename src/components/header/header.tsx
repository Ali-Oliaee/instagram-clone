import {
  HeartOutlined,
  HomeOutlined,
  InboxOutlined,
  LogoutOutlined,
  PlusCircleOutlined,
  SearchOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons'
import {
  Avatar,
  Button,
  Divider,
  Dropdown,
  Input,
  Menu,
  Tooltip,
} from 'antd'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Logo } from '../logo'
import './style.scss'

function Header() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const logout = () => {
    localStorage.clear()
    navigate('/')
    window.location.reload()
  }
  return (
    <div className="header">
      <Logo />
      <Input prefix={<SearchOutlined />} placeholder={t('search-placeholder')} className="search-input" />
      <div className="header-menu">
        <Tooltip title={t('home')} color="#777">
          <Link to="/">
            <Button className="header-menu-item">
              <HomeOutlined />
            </Button>
          </Link>
        </Tooltip>
        <Tooltip title={t('add-post')} color="#777">
          <Button className="header-menu-item" onClick={() => setSearchParams('add=true')}>
            <PlusCircleOutlined />
          </Button>
        </Tooltip>
        <Dropdown
          overlay={(
            <Menu>
              <Menu.Item icon={<UserOutlined />}>
                <Link to="/profile/-1">
                  {t('profile')}
                </Link>
              </Menu.Item>
              <Menu.Item icon={<SettingOutlined />}>
                <Link to="/settings">
                  {t('settings')}
                </Link>
              </Menu.Item>
              <Menu.Item icon={<InboxOutlined />}>
                <Link to="/saved">
                  {t('saved')}
                </Link>
              </Menu.Item>
              <Divider style={{ margin: 0 }} />
              <Menu.Item onClick={logout} danger icon={<LogoutOutlined />}>
                {t('logout')}
              </Menu.Item>
            </Menu>
         )}
          trigger={['click']}
        >
          <Avatar src={require('../../assets/images/default-user.jpg')} className="header-menu-item" size="small" />
        </Dropdown>
      </div>
    </div>
  )
}

export default Header
