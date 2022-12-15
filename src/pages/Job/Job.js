import { Button, Col, Drawer, List, Rate, Row, Space, Spin, Table, Tag } from 'antd'
import { CalendarOutlined, EditOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useMemo, useState } from 'react'
import { getJobs, getListJobByAccount } from '~/store/reducers/adminSlice'

function Job() {
  const jobs = useSelector((state) => state.adminReducer.jobs.list)
  const totalPage = useSelector((state) => state.adminReducer.jobs.totalPage)
  const isLoading = useSelector((state) => state.adminReducer.isLoading)
  let listJobUser = useSelector((state) => state.adminReducer.listJobUser)
  const dispatch = useDispatch()

  const [open, setOpen] = useState(false)
  const [openChildren1, setOpenChildren1] = useState(false)
  const [openChildren2, setOpenChildren2] = useState(false)
  const [info, setInfo] = useState()

  const handleShowDrawer = (data) => {
    setInfo(data)
    setOpen(true)
  }
  const onClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    dispatch(getJobs({ cur: 1, page: 6 }))
  }, [])

  const columns = [
    {
      title: '#',
      dataIndex: 'key',
      key: 'key',
      width: 50,
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
    },
    {
      title: 'Renter',
      dataIndex: 'renter',
      key: 'renter',
    },
    {
      title: 'Freelancer',
      dataIndex: 'freelancer',
      key: 'freelancer',
    },
    {
      title: 'Salary',
      dataIndex: 'salary',
      key: 'salary',
      render: (text) => <div>{text} $</div>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        switch (status) {
          case 4:
            return <Tag color="green">Done</Tag>
          case 0:
            return <Tag color="red">Close</Tag>
          case 2:
            return <Tag color="blue">Doing</Tag>
          case 1:
            return <Tag color="gold">Pending</Tag>
          case 3:
            return <Tag>Review</Tag>
          default:
            return <Tag color="magenta">?</Tag>
        }
      },
    },
    {
      title: 'Create at',
      dataIndex: 'createAt',
      key: 'createAt',
      render: (text) => (
        <div>
          <CalendarOutlined /> {text}
        </div>
      ),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      width: 80,
      render: (_, record) => (
        <Button onClick={() => handleShowDrawer(record.job)}>
          <EditOutlined />
        </Button>
      ),
    },
  ]

  const data = useMemo(() => {
    if (Boolean(jobs)) {
      return jobs.map((job, index) => ({
        key: index + 1,
        subject: job.subject,
        renter: job.account.username,
        freelancer: job.freelancer.name,
        salary: job.salary,
        status: job.status,
        createAt: job.created_at.slice(0, 10).split('-').reverse().join('/'),
        action: '',
        job,
      }))
    }
  }, [jobs])

  return (
    <Spin spinning={isLoading}>
      <Table
        columns={columns}
        dataSource={data}
        bordered
        size="middle"
        pagination={{
          showSizeChanger: false,
          pageSize: 6,
          total: totalPage * 6,
          onChange(page) {
            dispatch(getJobs({ cur: page, page: 6 }))
          },
        }}
      />
      {Boolean(info) ? (
        <>
          <Drawer title="Job Information" placement="right" size="large" onClose={onClose} open={open}>
            <Row style={{ margin: '20px 0' }}>
              <Col span={12}>
                <strong>Subject: </strong>
                {info.subject}
              </Col>
              <Col span={12}>
                <strong>Salary: </strong>
                {info.salary} $
              </Col>
            </Row>
            <Row style={{ margin: '20px 0' }}>
              <Col span={12}>
                <strong>Renter: </strong>
                <a
                  onClick={(e) => {
                    e.preventDefault()
                    dispatch(getListJobByAccount(info?.account?.id))
                    setOpenChildren1(true)
                  }}
                >
                  {info.account.username}
                </a>
              </Col>
              <Col span={12}>
                <strong>Freelancer: </strong>
                <a
                  onClick={(e) => {
                    e.preventDefault()
                    setOpenChildren2(true)
                  }}
                >
                  {info.freelancer.name}
                </a>
              </Col>
            </Row>
            <Row style={{ margin: '20px 0' }}>
              <Col>
                <strong>Description: </strong>
                <div dangerouslySetInnerHTML={{ __html: info.description }}></div>
              </Col>
            </Row>
            <Row style={{ margin: '20px 0' }}>
              <Col span={12}>
                <strong>Status: </strong>
                {info.status === 4 && <Tag color="green">Done</Tag>}
                {info.status === 0 && <Tag color="red">Close</Tag>}
                {info.status === 2 && <Tag color="blue">Doing</Tag>}
                {info.status === 1 && <Tag color="gold">Pending</Tag>}
              </Col>
              <Col span={12}>
                <strong>Result: </strong>
                {info.result}
              </Col>
            </Row>
            <Row style={{ margin: '20px 0' }}>
              <Col span={12}>
                <strong>Comment: </strong>
                <Rate allowHalf disabled value={info.rate} />
                <div>{info.comment}</div>
              </Col>
            </Row>
          </Drawer>
          <Drawer
            title="Account Information"
            width="600px"
            open={openChildren1}
            onClose={() => {setOpenChildren1(false); listJobUser = []}}
          >
            <div>
              <b>Renter:</b>
              {' ' + info.account.username}
            </div>
            <List 
              dataSource={listJobUser}
              renderItem={(item) => (
              <List.Item style={{display: "block"}}>
                <div><span style={{color: "#007bff", fontWeight: "bold"}}>{item.subject}</span>{"    "}<span>-{item.salary}$</span></div>
                <Rate allowHalf value={item.rate} />
                <div><p>{item.comment}</p></div>
              </List.Item>
              )}
            />
          </Drawer>
          <Drawer
            title="Freelancer Information"
            width="600px"
            open={openChildren2}
            onClose={() => setOpenChildren2(false)}
          >
            <Row>
              <Space size="middle">
                <Col>
                  <img style={{ borderRadius: '50%' }} src={info.freelancer.thumbnail} />
                </Col>
                <Col>
                  <strong>{info.freelancer.name}</strong>
                  <div>{info.freelancer.address}</div>
                  <Rate allowHalf disabled defaultValue={info.freelancer.rate} />
                </Col>
              </Space>
            </Row>
            <Row style={{ margin: '20px 0' }}>
              <Col span={12}>
                <strong>Fullname: </strong>
                {info.freelancer.name}
              </Col>
              <Col span={12}>
                <strong>Gender: </strong>
                {info.freelancer.gender}
              </Col>
            </Row>
            <Row style={{ margin: '20px 0' }}>
              <Col span={12}>
                <strong>Phone: </strong>
                {info.freelancer.phone}
              </Col>
              <Col span={12}>
                <strong>Experience: </strong>
                {info.freelancer.experience}
              </Col>
            </Row>
            <Row style={{ margin: '20px 0' }}>
              <Col span={12}>
                <strong>Description: </strong>
                <div dangerouslySetInnerHTML={{ __html: info.freelancer.description }}></div>
              </Col>
              <Col span={12}>
                <strong>Average income: </strong>
                {info.freelancer.averageIncome}$
              </Col>
            </Row>
            <Row style={{ margin: '20px 0' }}>
              <Col span={12}>
                <strong>Total job success: </strong>
                {info.freelancer.totalJobDone}
              </Col>
              <Col span={12}>
                <strong>Total income: </strong>
                {info.freelancer.totalEarning}$
              </Col>
            </Row>
            <Row style={{ margin: '20px 0' }}>
              <Col span={12}>
                <strong>Language: </strong>
                {info.freelancer.language.split(', ').map((item, index) => (
                  <Tag color="geekblue" key={index}>
                    {item}
                  </Tag>
                ))}
              </Col>
            </Row>
          </Drawer>
        </>
      ) : (
        <></>
      )}
    </Spin>
  )
}

export default Job
