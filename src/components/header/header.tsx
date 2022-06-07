import {
  CompassOutlined,
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
  Col,
  Divider,
  Dropdown,
  Input,
  Menu,
  Row,
} from 'antd'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Logo } from '../logo'
import './style.scss'

function Header({ setSearchKey }: any) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const user = JSON.parse(localStorage.getItem('user') ?? '{}')
  const logout = () => {
    localStorage.clear()
    navigate('/')
    window.location.reload()
  }

  const menu = () => (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        <Link to={`/profile/${user.account.id}`}>
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
  )

  return (
    <Row className="header" justify="center">
      <Col xs={24} sm={22} md={20} lg={18}>
        <Row justify="space-between" align="middle">
          <Logo />
          <Input size="large" onChange={(e) => setSearchKey(e.target.value)} prefix={<SearchOutlined />} placeholder={t('search-placeholder')} className="search-input" />
          <div className="header-menu">
            <Link to="/">
              <Button icon={<HomeOutlined />} size="large" className="header-menu-item" />
            </Link>
            <Link to="/discovery">
              <Button icon={<CompassOutlined />} size="large" className="header-menu-item" />
            </Link>
            <Button className="header-menu-item" size="large" icon={<PlusCircleOutlined />} onClick={() => setSearchParams({ add: 'true' })} />
            <Dropdown
              className="header-menu-item"
              overlay={menu}
              trigger={['click']}
            >
              <Avatar src={user.account.photo} size="small" />
            </Dropdown>
          </div>
        </Row>
      </Col>
    </Row>
  )
}

export default Header
