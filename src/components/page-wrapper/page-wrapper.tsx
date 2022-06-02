import { Col, Row } from 'antd'
import { Header } from '../header'
import './style.scss'

function PageWrapper({ children, className, setSearchKey }: any) {
  return (
    <>
      <Header setSearchKey={setSearchKey} />
      <Row justify="center" className={className}>
        <Col xs={24} sm={22} md={20} lg={18}>
          <Row>
            {children}
          </Row>
        </Col>
      </Row>
    </>
  )
}

export default PageWrapper
