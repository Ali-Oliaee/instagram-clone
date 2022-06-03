import { Col, Row, Spin } from 'antd'
import { Header } from '../header'
import './style.scss'

function PageWrapper({
  children, className, setSearchKey, isLoading,
}: any) {
  return (
    <>
      <Header setSearchKey={setSearchKey} />
      <Row justify="center" className={className}>
        <Col xs={24} sm={22} md={20} lg={18}>
          <Row justify="center">
            {isLoading ? <Spin size="large" /> : children}
          </Row>
        </Col>
      </Row>
    </>
  )
}

export default PageWrapper
