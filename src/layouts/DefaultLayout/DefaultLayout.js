import { Row, Col, Layout, Menu, Avatar, Dropdown, Space } from "antd";
import clsx from "clsx";
import styles from "./DefaultLayout.module.scss";
import { Footer } from "antd/es/layout/layout";
import {
  DashboardOutlined,
  GlobalOutlined,
  LaptopOutlined,
  PoweroffOutlined,
  SyncOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { NavLink, useLocation } from "react-router-dom";
import storage from "~/until/storage";
const { Item } = Menu;

function DefaultLayout({ children }) {
  const location = useLocation();
  const items = [
    {
      key: "1",
      label: (
        <div><Space><UserOutlined />Profile</Space></div>
      ),
    },
    {
      key: "2",
      label: (
        <div><a style={{color: "black"}} href="/login" onClick={() => {localStorage.clear()}}><Space><PoweroffOutlined />Logout</Space></a></div>
      ),
    },
  ];
  return (
    <Layout>
      <Row className={clsx(styles.Header)} justify="space-between" align="middle">
        <Col span={4}>
          <div className={clsx(styles.logo)}>
            <img src={require("~/assets/img/logo/logo.png")} />
            <div>FFlancer</div>
          </div>
        </Col>
        <Col>
          <Row align="middle" style={{ marginRight: "3rem" }}>
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
                  trigger={["click"]}
                  placement="bottomRight"
                >
                  <a onClick={(e) => e.preventDefault()} className={styles.userInfo}>
                    <Row>
                      <Col>
                        <Avatar
                          className={styles.avatar}
                          style={{ backgroundColor: "#87d068" }}
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
        <div theme="light" className={clsx(styles.sider)}>
          <Menu
            className={clsx(styles.menu)}
            defaultSelectedKeys={[location.pathname.replace(/[^a-zA-Z0-9 ]/g, "")]}
            mode="vertical"
          >
            <Item key="dashboard" title="asdad">
              <NavLink to="/dashboard">
                <span>
                  <DashboardOutlined /> Dashboard
                </span>
              </NavLink>
            </Item>
            <Menu.ItemGroup title="SYSTEM" className={clsx(styles.menuTitle)} />
            <Item key="admin">
              <NavLink to="/admin">
                <span>
                  <UserOutlined /> Admin
                </span>
              </NavLink>
            </Item>
            <Menu.ItemGroup title="MANAGEMENT" className={clsx(styles.menuTitle)} />
            <Item key="user">
              <NavLink to="/user">
                <span>
                  <TeamOutlined /> User
                </span>
              </NavLink>
            </Item>
            <Item key="freelancer">
              <NavLink to="/freelancer">
                <span>
                  <GlobalOutlined /> Freelancer
                </span>
              </NavLink>
            </Item>
            <Item key="job">
              <NavLink to="/job">
                <span>
                  <LaptopOutlined /> Job
                </span>
              </NavLink>
            </Item>
            <Item key="transaction">
              <NavLink to="/transaction">
                <span>
                  <SyncOutlined /> Transaction
                </span>
              </NavLink>
            </Item>
            <Menu.ItemGroup title="STATISTICAL / REPORT" className={clsx(styles.menuTitle)} />
            <Item key="report">
              <NavLink to="/report">
                <span>
                  <SyncOutlined /> Statistical / Report
                </span>
              </NavLink>
            </Item>
          </Menu>
        </div>
        <div className={styles.content}>
          <div>{children}</div>
        </div>
      </Layout>
    </Layout>
  );
}

export default DefaultLayout;
