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
import { Link, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import { defaultImage } from '../../utils/constants'
import { Logo } from '../logo'
import { getAccountInformation } from '../../utils/api'
import './style.scss'

function Header({ setSearchKey, search }: any) {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const currentUser = JSON.parse(localStorage.getItem('user') || '{}')
  const logout = () => {
    localStorage.clear()
  }
  const { data } = useQuery('currentUser', () => getAccountInformation(currentUser.id))
  // eslint-disable-next-line no-unsafe-optional-chaining
  const userAvatar = data?.[0]?.photo

  const menu = () => (
    <Menu
      items={[
        {
          key: 'profile',
          icon: <UserOutlined />,
          label: (
            <Link to={`/profile/${currentUser.id}`}>
              {t('profile')}
            </Link>
          ),
        },
        {
          key: 'setting',
          icon: <SettingOutlined />,
          label: (
            <Link to="/settings">
              {t('settings')}
            </Link>
          ),
        },
        {
          key: 'saved',
          icon: <InboxOutlined />,
          label: (
            <Link to="/saved">
              {t('saved')}
            </Link>
          ),
        },
        {
          type: 'divider',
        },
        {
          key: 'logout',
          icon: <LogoutOutlined />,
          label: t('logout'),
          danger: true,
          onClick: logout,
        },
      ]}
    />
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
              <Avatar src={userAvatar ?? defaultImage} size="small" />
            </Dropdown>
          </div>
        </Row>
      </Col>
    </Row>
  )
}

export default Header
