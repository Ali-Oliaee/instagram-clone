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
  Dropdown,
  Input,
  Menu,
  Row,
} from 'antd'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import { Link, useSearchParams } from 'react-router-dom'
import { useCurrentUser } from '../../context'
import { getAccountInformation } from '../../utils/api'
import { defaultImage } from '../../utils/constants'
import { Logo } from '../logo'
import './style.scss'

function Header({ setSearchKey, search }: any) {
  const { currentUser, setCurrentUser } : any = useCurrentUser()
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const user = currentUser
  const { data } = useQuery('user', () => getAccountInformation(user.account.id))
  const logout = () => {
    setCurrentUser(null)
    localStorage.clear()
  }

  const menu = () => (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        <Link to={`/profile/${user?.id}`}>
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
      <Menu.Item key="logout" onClick={logout} danger icon={<LogoutOutlined />}>
        {t('logout')}
      </Menu.Item>
    </Menu>
  )

  return (
    <Row className="header" justify="center">
      <Col xs={24} sm={22} md={20} lg={18}>
        <Row justify="space-between" align="middle">
          <Link to="/">
            <Logo />
          </Link>
          {search && (<Input size="large" onChange={(e) => setSearchKey(e.target.value)} prefix={<SearchOutlined />} placeholder={t('search-placeholder')} className="search-input" />)}
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
              <Avatar src={data?.[0].photo ?? defaultImage} size="small" />
            </Dropdown>
          </div>
        </Row>
      </Col>
    </Row>
  )
}

export default Header
