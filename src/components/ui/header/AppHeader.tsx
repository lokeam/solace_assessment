
import { Row, Col } from 'antd';
import { Typography } from 'antd';

const { Title } = Typography;

export default function AppHeader() {
  return (
    <header className="header-container" style={{
      backgroundColor: 'rgb(29, 67, 57)',
      borderBottom: '1px solid #374151',
      padding: '24px 0',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      width: '100%'
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 48px'}}>
        <Row justify="space-between" align="middle">
          <Col>
            <h1 className="primary-font solace-header">
              Solace
            </h1>
          </Col>
        </Row>
      </div>
    </header>
  )
}
