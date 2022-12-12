import { Row, Col, Layout, Menu, Avatar, Dropdown, Space } from 'antd'
import clsx from 'clsx'
import {
  BarChartOutlined,
  DashboardOutlined,
  GlobalOutlined,
  LaptopOutlined,
  PoweroffOutlined,
  SyncOutlined,
  TeamOutlined,
  UserOutlined,
  MenuOutlined,
} from '@ant-design/icons'
import { NavLink, useLocation } from 'react-router-dom'
import React, { useState } from 'react'

import styles from './DefaultLayout.module.scss'
import storage from '~/until/storage'

const { Content, Sider, Footer } = Layout

function DefaultLayout({ children }) {
  const location = useLocation()

  const [collapsed, setCollapsed] = useState(false)

  const items = [
    {
      key: '1',
      label: (
        <div>
          <Space>
            <UserOutlined />
            Profile
          </Space>
        </div>
      ),
    },
    {
      key: '2',
      label: (
        <div>
          <a
            style={{ color: 'black' }}
            href="/login"
            onClick={() => {
              localStorage.clear()
            }}
          >
            <Space>
              <PoweroffOutlined />
              Logout
            </Space>
          </a>
        </div>
      ),
    },
  ]

  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    }
  }

  console.log(location.pathname.replace(/[^a-zA-Z0-9 ]/g, ''))

  const itemMenu = [
    getItem(<NavLink to="/dashboard">Dashboard</NavLink>, 'dashboard', <DashboardOutlined />),
    getItem(<span className={styles.menuTitle}>SYSTEM</span>, 'SYSTEM', null, null, 'group'),
    getItem(<NavLink to="/admin">Admin</NavLink>, 'admin', <UserOutlined />),
    getItem(<span className={styles.menuTitle}>MANAGEMENT</span>, 'MANAGEMENT', null, null, 'group'),
    getItem(<NavLink to="/user">User</NavLink>, 'user', <TeamOutlined />),
    getItem(<NavLink to="/freelancer">Freelancer</NavLink>, 'freelancer', <GlobalOutlined />),
    getItem(<NavLink to="/job">Job</NavLink>, 'job', <LaptopOutlined />),
    getItem(<NavLink to="/transaction">Transaction</NavLink>, 'transaction', <SyncOutlined />),
    getItem(
      <span className={styles.menuTitle}>STATISTICAL / REPORT</span>,
      'STATISTICAL / REPORT',
      null,
      null,
      'group'
    ),
    getItem(<NavLink to="/report">Statistical / Report</NavLink>, 'report', <BarChartOutlined />),
  ]

  return (
    <Layout>
      <Row className={clsx(styles.Header)} justify="space-between" align="middle">
        <Col span={4}>
          <div className={clsx(styles.logo)}>
            <img src={require('~/assets/img/logo/logo.png')} />
            <div>FFlancer</div>
          </div>
        </Col>
        <Col>
          <Row align="middle" style={{ marginRight: '3rem' }}>
            <Col className={clsx(styles.navTitle)} align="end">
              <div>FFlancer Technology Joint Stock Company</div>
              <div>D.Administration</div>
            </Col>
            <span className={clsx(styles.divider)}></span>
            <Col>
              <Row>
                <Dropdown
                  menu={{
                    items,
                  }}
                  trigger={['click']}
                  placement="bottomRight"
                >
                  <a onClick={(e) => e.preventDefault()} className={styles.userInfo}>
                    <Row>
                      <Col>
                        <Avatar
                          className={styles.avatar}
                          style={{ backgroundColor: '#87d068' }}
                          icon={<UserOutlined />}
                        />
                      </Col>
                      <Col>
                        <div>{storage.getUserName()}</div>
                        <div>{storage.getUserEmail()}</div>
                      </Col>
                    </Row>
                  </a>
                </Dropdown>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
      <Layout className={clsx(styles.container)}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          className={styles.sider}
          width={250}
          trigger={null}
        >
          <Menu
            className={clsx(styles.menu)}
            selectedKeys={[location.pathname.replace(/[^a-zA-Z0-9 ]/g, '')]}
            mode="vertical"
            items={itemMenu}
          />
          {React.createElement(collapsed ? MenuOutlined : MenuOutlined, {
            className: styles.trigger,
            onClick: () => setCollapsed(!collapsed),
          })}
        </Sider>
        <Layout>
          <Content className={styles.content}>{children}</Content>
          <Footer className={clsx(styles.footer)}>Copyright © 2022. All right reserved.</Footer>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default DefaultLayout
