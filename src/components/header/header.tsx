import {
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
} from 'antd'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Logo } from '../logo'
import './style.scss'

function Header({ setSearchKey }: any) {
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
      <Input onChange={(e) => setSearchKey(e.target.value)} prefix={<SearchOutlined />} placeholder={t('search-placeholder')} className="search-input" />
      <div className="header-menu">
        <Link to="/">
          <Button icon={<HomeOutlined />} size="large" className="header-menu-item" />
        </Link>
        <Button className="header-menu-item" size="large" icon={<PlusCircleOutlined />} onClick={() => setSearchParams({ add: 'true' })} />
        <Dropdown
          className="header-menu-item"
          overlay={(
            <Menu>
              <Menu.Item key="profile" icon={<UserOutlined />}>
                <Link to="/profile/null">
                  {t('profile')}
                </Link>
              </Menu.Item>
              <Menu.Item key="setting" icon={<SettingOutlined />}>
                <Link to="/settings">
                  {t('settings')}
                </Link>
              </Menu.Item>
              <Menu.Item key="saved" icon={<InboxOutlined />}>
                <Link to="/saved">
                  {t('saved')}
                </Link>
              </Menu.Item>
              <Divider style={{ margin: 0 }} />
              <Menu.Item key="logout" onClick={logout} danger icon={<LogoutOutlined />}>
                {t('logout')}
              </Menu.Item>
            </Menu>
         )}
          trigger={['click']}
        >
          <Avatar src={require('../../assets/images/default-user.jpg')} size="small" />
        </Dropdown>
      </div>
    </div>
  )
}

export default Header
