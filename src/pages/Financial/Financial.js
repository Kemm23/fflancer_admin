import { Line } from '@ant-design/plots'
import { Button, DatePicker, Divider } from 'antd'
import styles from './Financial.module.scss'

const { RangePicker } = DatePicker

function Financial() {
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
    <>
      <div className={styles.search}>
        <RangePicker
          showTime={{
            format: 'HH:mm',
          }}
          format="YYYY-MM-DD HH:mm"
        />
        <Button className={styles.btnSearch} type="primary">
          Search
        </Button>
      </div>
      <Divider></Divider>
        <Line {...config} className={styles.chart}/>
    </>
  )
}

export default Financial
