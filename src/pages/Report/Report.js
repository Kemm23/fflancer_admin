import { HomeOutlined } from '@ant-design/icons'
import { Breadcrumb, Card } from 'antd'
import { Link } from 'react-router-dom'
import styles from './Report.module.scss'

const { Meta } = Card

function Report() {
  return (
    <div style={{ margin: 30 }}>
      <Breadcrumb>
        <Breadcrumb.Item href="/dashboard">
          <HomeOutlined /> Home
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <strong>Statistical Report</strong>
        </Breadcrumb.Item>
      </Breadcrumb>
      <h1>List Report</h1>
      <p>Select a report type you want to view</p>
      <div className={styles.wrapperCard}>
        <Link to="financial">
          <Card
            hoverable
            style={{
              width: 240,
            }}
            className={styles.chart}
            cover={<img alt="example" src={require('~/assets/img/contract.png')} />}
          >
            <Meta title="Financial report" description="Statistical financial information" />
          </Card>
        </Link>
      </div>
    </div>
  )
}

export default Report
