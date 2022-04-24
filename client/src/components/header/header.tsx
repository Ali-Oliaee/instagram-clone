/* eslint-disable global-require */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
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
  Divider,
  Dropdown,
  Input,
  Menu,
  Tooltip,
} from 'antd'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import { Logo } from '../logo'
import './style.scss'

function Header() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const logout = () => {
    localStorage.clear()
    navigate('/')
    window.location.reload()
  }
  return (
    <div className="header">
      <Logo />
      <Input prefix={<SearchOutlined />} placeholder={t('search')} className="search-input" />
      <div className="header-menu">
        <Tooltip title={t('home')} color="#777">
          <Link to="/" className="header-menu-item">
            <HomeOutlined />
          </Link>
        </Tooltip>
        <Tooltip title={t('add-post')} color="#777">
          <Link to="/" className="header-menu-item">
            <PlusCircleOutlined />
          </Link>
        </Tooltip>
        <Tooltip title={t('likes')} color="#777">
          <Link to="/" className="header-menu-item">
            <HeartOutlined />
          </Link>
        </Tooltip>
        <Dropdown
          overlay={(
            <Menu>
              <Menu.Item disabled icon={<UserOutlined />}>
                {t('profile')}
              </Menu.Item>
              <Menu.Item disabled icon={<SettingOutlined />}>
                {t('settings')}
              </Menu.Item>
              <Menu.Item disabled icon={<InboxOutlined />}>
                {t('saved')}
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
