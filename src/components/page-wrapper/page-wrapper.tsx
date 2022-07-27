import { Col, Row, Spin } from 'antd'
import { Helmet } from 'react-helmet'
import { Header } from '../header'
import { AddPostModal } from '../modals'
import './style.scss'

function PageWrapper({
  children, className, setSearchKey, isLoading, search, title = 'Instagram',
}: any) {
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Header setSearchKey={setSearchKey} search={search} />
      <Row justify="center" className={isLoading ? 'loading-page' : className}>
        <Col xs={24} sm={22} md={20} lg={18}>
          {isLoading ? <Spin size="large" /> : children}
        </Col>
      </Row>
      <AddPostModal />
    </>
  )
}

export default PageWrapper
