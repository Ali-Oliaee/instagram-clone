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
import { Link } from 'react-router-dom'
import { useMediaQuery } from 'usehooks-ts'
import { Logo } from '../logo'
import './style.scss'

function MobileHeader() {
  return (
    <div>mobile Header</div>
  )
}

function DesktopHeader() {
  const { t } = useTranslation()
  return (
    <div className="desktop-header">
      <Logo />
      <Input prefix={<SearchOutlined />} placeholder="search" className="search-input" />
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
                {t('setting')}
              </Menu.Item>
              <Menu.Item disabled icon={<InboxOutlined />}>
                {t('saved')}
              </Menu.Item>
              <Divider style={{ margin: 0 }} />
              <Menu.Item danger disabled icon={<LogoutOutlined />}>
                {t('logout')}
              </Menu.Item>
            </Menu>
         )}
          trigger={['click']}
        >
          <Avatar className="header-menu-item" />
        </Dropdown>
      </div>
    </div>
  )
}

function Header() {
  const isMobile = useMediaQuery('(max-width: 400px)')
  return isMobile ? <MobileHeader /> : <DesktopHeader />
}

export default Header
