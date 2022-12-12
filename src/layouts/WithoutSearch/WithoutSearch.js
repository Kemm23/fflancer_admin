import clsx from "clsx";
import styles from "./WithoutSearch.module.scss";
import { Breadcrumb, Button} from "antd";
import {
    HomeOutlined,
    PlusOutlined,
} from "@ant-design/icons";
import { Footer } from "antd/es/layout/layout";

function WithoutSearch({ children, ...props }) {
  return (<div className={clsx(styles.container)}>
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
    </div>)
    

}

export default WithoutSearch;
