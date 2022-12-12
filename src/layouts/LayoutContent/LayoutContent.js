import clsx from 'clsx'
import styles from './LayoutContent.module.scss'
import { Breadcrumb, Button, Divider, Input, Modal, Form } from 'antd'
import { HomeOutlined, PlusOutlined } from '@ant-design/icons'
import Search from 'antd/es/transfer/search'
import { Footer } from 'antd/es/layout/layout'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createAccount } from '~/store/reducers/adminSlice'
import { Link } from 'react-router-dom'

function LayoutContent({ children, ...props }) {
  const onSearch = (value) => console.log(value)
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [form] = Form.useForm()

  const handleCancel = () => {
    setOpen(false)
    form.resetFields()
  }

  const onFinish = async (values) => {
    setConfirmLoading(true)
    const { confirm, ...data } = values
    if (props.title === 'Admin') {
      Object.assign(data, { role: 0 })
    } else if (props.title === 'User') {
      Object.assign(data, { role: 1 })
    }
    await dispatch(createAccount(data))
    setOpen(false)
    setConfirmLoading(false)
    console.log('Success:', data)
    form.resetFields()
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
      <div className={clsx(styles.container)}>
        <div className={clsx(styles.header)}>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/dashboard"><HomeOutlined /> Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <strong> {props.title} management</strong>
            </Breadcrumb.Item>
          </Breadcrumb>
          <div>
            <h3> {props.title} management</h3>
            {(props.title === 'Admin' || props.title === 'User') && (
              <>
                <Button className={styles.btnCreate} type="primary" onClick={() => setOpen(true)}>
                  <PlusOutlined />
                  Create
                </Button>
                <Modal
                  title={'Create  ' + props.title}
                  open={open}
                  okText="Create"
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
                    wrapperCol={{}}
                    initialValues={{
                      remember: true,
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
                          message: 'Please input your username!',
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
                          type: 'email',
                          message: 'The input is not valid E-mail!',
                        },
                        {
                          required: true,
                          message: 'Please input your E-mail!',
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      label="Password"
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: 'Please input your password!',
                        },
                      ]}
                    >
                      <Input.Password />
                    </Form.Item>

                    <Form.Item
                      name="confirm"
                      label="Confirm Password"
                      dependencies={['password']}
                      hasFeedback
                      rules={[
                        {
                          required: true,
                          message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                              return Promise.resolve()
                            }
                            return Promise.reject(new Error('The two passwords that you entered do not match!'))
                          },
                        }),
                      ]}
                    >
                      <Input.Password />
                    </Form.Item>
                  </Form>
                </Modal>
              </>
            )}
          </div>
        </div>
        <div className={styles.wrapper}>
          <div>
            <div className={styles.search}>
              <Search placeholder="Full name" allowClear enterButton="Search" size="large" onSearch={onSearch} />
              <Button className={styles.btnSearch} type="primary" onClick={onSearch}>
                Search
              </Button>
            </div>
            <Divider></Divider>
            {children}
          </div>
        </div>
      </div>
  )
}

export default LayoutContent
