import clsx from "clsx";
import { Button, Input, Modal, Space, Spin, Table, Tag, Form } from "antd";
import { CalendarOutlined, DeleteOutlined, EditOutlined, UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { getAccounts } from "~/store/reducers/adminSlice";

function User() {
  const users = useSelector((state) => state.adminReducer.users.list);
  const totalPage = useSelector((state) => state.adminReducer.users.totalPage);
  const isLoading = useSelector((state) => state.adminReducer.isLoading);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [info, setInfo] = useState();
  const [form] = Form.useForm();

  const handleShow = (data) => {
    setInfo(data);
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
    form.resetFields();
  };

  const onFinish = async (values) => {
    console.log("Success:", values);
    setOpen(false);
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    dispatch(getAccounts({ type: 1, cur: 1, page: 5 }));
  }, []);

  useEffect(() => {
    if (info) {
      form.setFieldsValue({
        ["username"]: info.fullname,
        ["email"]: info.username,
      });
    }
  }, [info]);
  const columns = [
    {
      title: "#",
      dataIndex: "key",
      key: "key",
      width: 50,
    },
    {
      title: "Fullname",
      dataIndex: "fullname",
      key: "fullname",
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      render: (text) => (
        <div>
          <UserOutlined style={{ marginRight: "0.5rem" }} />
          {text}
        </div>
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: () => <Tag color="geekblue">User</Tag>,
    },
    {
      title: "Create at",
      dataIndex: "createAt",
      key: "createAt",
      render: (text) => (
        <div>
          <CalendarOutlined /> {text}
        </div>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: 100,
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => handleShow(record)}>
            <EditOutlined />
          </Button>
          <Button onClick={() => setConfirm(true)}>
            <DeleteOutlined />
          </Button>
        </Space>
      ),
    },
  ];
  const data = useMemo(() => {
    if (Boolean(users)) {
      return users.map((user, index) => ({
        key: index + 1,
        fullname: user.username,
        username: user.email,
        type: user.role,
        createAt: user.createdAt.slice(0, 10).split("-").reverse().join("/"),
        action: "",
      }));
    }
  });
  return (
    <Spin spinning={isLoading}>
      <Table
        columns={columns}
        dataSource={data}
        bordered
        size="middle"
        pagination={{
          showSizeChanger: false,
          pageSize: 5,
          total: totalPage * 5,
          onChange(page) {
            dispatch(getAccounts({ type: 1, cur: page, page: 5 }));
          },
        }}
      />
      {Boolean(info) ? (
        <Modal
          title="Update"
          open={open}
          okText="update"
          onOk={form.submit}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
          <Form
            form={form}
            name="basic"
            layout="vertical"
            labelCol={{
              span: 8,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <Input disabled />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("The two passwords that you entered do not match!"));
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
          </Form>
        </Modal>
      ) : (
        <></>
      )}
      <Modal title="Are you sure you want to delete user account?" open={confirm} onCancel={() => setConfirm(false)} onOk={() => setConfirm(false)}>
        <p>Deleted data cannot be recovered</p>
      </Modal>
    </Spin>
  );
}

export default User;
