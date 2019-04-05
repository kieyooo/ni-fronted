import React, { Component } from 'react'
import { Row, Col } from 'antd'
import styles from './index.less'
import echarts from './EChartsImport'


class MyECharts extends Component {
  componentDidMount(){
    const myEChart = echarts.init(document.getElementById('ECharts'));
    this.myEChart = myEChart;
    const { CurrentData, VoltageData, TimeData } = this.props;
    myEChart.setOption( {
      tooltip: {
          trigger: 'axis'
      },
      legend: {
          data:['电流','电压']
      },
      grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
      },
      toolbox: {
          feature: {
              saveAsImage: {}
          }
      },
      xAxis: {
          type: 'category',
          boundaryGap: false,
          data: TimeData || []
      },
      yAxis: {
          type: 'value'
      },
      series: [
          {
              name:'电流',
              type:'line',
              stack: '总量',
              data: CurrentData || []
          },
          {
              name:'电压',
              type:'line',
              stack: '总量',
              data: VoltageData || []
          }
      ]
    })
  }

  componentWillReceiveProps() {
    const { CurrentData, VoltageData, TimeData } = this.props;
    this.myEChart.setOption({
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: TimeData || []
        },
        series: [
            {
                name:'电流',
                type:'line',
                stack: '总量',
                data:CurrentData || []
            },
            {
                name:'电压',
                type:'line',
                stack: '总量',
                data:VoltageData || []
            }
        ]
    })

  }

  render() {
    return (
      <Row>
        <Col id='ECharts' className={styles.main} span={24} />
      </Row>
    ) 
  }
}

export default MyECharts