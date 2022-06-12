import { Col, Row, Spin } from 'antd'
import { Header } from '../header'
import './style.scss'

function PageWrapper({
  children, className, setSearchKey, isLoading, search,
}: any) {
  return (
    <>
      <Header setSearchKey={setSearchKey} search={search} />
      <Row justify="center" className={className}>
        <Col xs={24} sm={22} md={20} lg={18}>
          {isLoading ? <Spin size="large" /> : children}
        </Col>
      </Row>
    </>
  )
}

export default PageWrapper
