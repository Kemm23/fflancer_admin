import clsx from "clsx";
import styles from "./WithoutSearch.module.scss";
import { Breadcrumb, Button} from "antd";
import {
    HomeOutlined,
    PlusOutlined,
} from "@ant-design/icons";
import { DefaultLayout } from "~/layouts";
import { Footer } from "antd/es/layout/layout";

function WithoutSearch({ children, ...props }) {
  return <DefaultLayout>
    <div className={clsx(styles.container)}>
      <div className={clsx(styles.header)}>
        <Breadcrumb>
          <Breadcrumb.Item href="/dashboard">
            <HomeOutlined /> Home
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <strong> {props.title} management</strong>
          </Breadcrumb.Item>
        </Breadcrumb>
        <div>
          <h3> {props.title} management</h3>
        </div>
      </div>
      <div className={styles.wrapper}>
        <div>
          {children}
        </div>
      </div>
      <Footer className={clsx(styles.footer)}>Copyright © 2022. All right reserved.</Footer>
    </div>
  </DefaultLayout>;
}

export default WithoutSearch;
