import { Col, List, Progress, Row, Space, Spin } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import styles from './Dashboard.module.scss'
import storage from '~/until/storage'
import { getAccounts } from '~/store/reducers/adminSlice'
import { Link } from 'react-router-dom'
import { ArrowRightOutlined, ExclamationCircleOutlined, UserOutlined } from '@ant-design/icons'

import React from 'react'
import { Line } from '@ant-design/plots'

function Dashboard() {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.adminReducer.users.list)
  const freelancers = useSelector((state) => state.adminReducer.listFreelancer.list)
  const totalUsers = users?.length + freelancers?.length

  useEffect(() => {
    dispatch(getAccounts({ type: 1 }))
    dispatch(getAccounts({ type: 2 }))
  }, [])

  const data = [
    {
      year: '08/12/2022',
      value: 10,
    },
    {
      year: '01/12/2022',
      value: 20,
    },
    {
      year: '02/12/2022',
      value: 2,
    },
    {
      year: '05/12/2022',
      value: 2,
    },
  ]

  const config = {
    data,
    xField: 'year',
    yField: 'value',
    label: {},
    point: {
      size: 5,
      shape: 'diamond',
      style: {
        fill: 'white',
        stroke: '#5B8FF9',
        lineWidth: 2,
      },
    },
    tooltip: {
      showMarkers: false,
    },
    state: {
      active: {
        style: {
          shadowBlur: 4,
          stroke: '#000',
          fill: 'red',
        },
      },
    },
    interactions: [
      {
        type: 'marker-active',
      },
    ],
  }

  return (
    <div className={styles.container}>
      <h1>Welcome {storage.getUserName()}</h1>
      <div className={styles.subTitle}>Quick statistics of the whole system</div>
      <Space direction="vertical" style={{ width: '100%' }} size={30}>
        <Row gutter={30}>
          <Col flex="50%">
            <Spin spinning={!Boolean(users) && !Boolean(freelancers)} style={{ height: '100%' }} />
            <div className={styles.wrapperOverview}>
              <div className={styles.titleItem}>User statistics</div>
              <div className={styles.subTitleItem}>User statistics on the system</div>
              <h4>{Boolean(totalUsers) ? totalUsers : ''}</h4>
              <Progress
                percent={(users?.length / totalUsers) * 100}
                trailColor="#ffc107"
                strokeLinecap="square"
                strokeWidth={20}
                showInfo={false}
              />
              <List>
                <List.Item className={styles.listItem}>
                  <div>
                    <span className={styles.iconProgress1}></span> Normal User
                  </div>
                  <Space>{users?.length}Accounts</Space>
                </List.Item>
                <List.Item className={styles.listItem}>
                  <div>
                    <span className={styles.iconProgress2}></span>
                    {'  '}Freelancer
                  </div>
                  <Space>{freelancers?.length}Accounts</Space>
                </List.Item>
              </List>
            </div>
          </Col>
          <Col flex="50%">
            <Spin spinning={!Boolean(users)} />
            <div className={styles.wrapperOverview}>
              <div className={styles.titleItem}>
                <div>User</div>
                <Link to="/user">
                  See Detail <ArrowRightOutlined />
                </Link>
              </div>
              <div className={styles.subTitleItem}>List new user</div>
              <List
                itemLayout="horizontal"
                dataSource={users?.slice(1, 6)}
                renderItem={(item) => (
                  <List.Item className={styles.listItem}>
                    <List.Item.Meta
                      avatar={<UserOutlined />}
                      title={item.username}
                      description={
                        <span>
                          <b>Created At: </b>
                          {item.createdAt.slice(0, 10).split('-').reverse().join('/')}
                        </span>
                      }
                    />
                    <Link to="/user">
                      <ExclamationCircleOutlined />
                    </Link>
                  </List.Item>
                )}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <div className={styles.wrapperOverview}>
            <div className={styles.titleItem}>
              <div>Financial chart</div>
              <Link to="/report">
                See Detail <ArrowRightOutlined />
              </Link>
            </div>
            <div className={styles.subTitleItem}>Revenue in the last 30 days</div>
            <Line {...config}/>
          </div>
        </Row>
      </Space>
    </div>
  )
}

export default Dashboard
