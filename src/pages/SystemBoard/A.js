import React from 'react';
import { Card, Row, Col } from 'antd';
import echarts from '@/common/importEchart';
import ReactEcharts from 'echarts-for-react';

function getTitle(data) {
  const value = data.data[0].value[1];
  const name = data && data.name;
  if (name.includes('Voltage')) {
    return {
      name: 'V',
      value: value.toFixed(2),
      max: 450,
      title: 'Voltage (V)',
    };
  }
  if (name.includes('Power waste')) {
    return {
      name: value < 1 ? 'W' : 'KW',
      value: value < 1 ? (value * 1000).toFixed(2) : value.toFixed(2),
      max: value < 1 ? 1000 : 100,
      title: 'Power waste (KW)',
    };
  }
  if (name.includes('Current')) {
    return {
      name: value < 1 ? 'mA' : 'A',
      value: value < 1 ? (value * 1000).toFixed(2) : value.toFixed(2),
      max: value < 1 ? 1000 : 50,
      title: 'Current (A)',
    };
  }
  return {
    name: 'error',
    value: 0,
    max: 100,
  };
}

const DeviceTypeIsA = ({ data, loading }) => {
  const deviceNameArr = Object.keys(data);
  return (
    <div>
      <Card style={{ marginBottom: '10px' }} loading={loading}>
        <Row gutter={8}>
          {deviceNameArr.map((val, index) => {
            return (
              <Col sm={24} lg={8} xs={24}>
                {data[val].data.length !== 0 ? (
                  <Card>
                    <ReactEcharts
                      echarts={echarts}
                      notMerge
                      key={index.toString()}
                      lazyUpdate
                      option={{
                        title: {
                          text: data[val].name,
                        },
                        tooltip: {
                          formatter: '{a} <br/> {c} {b}',
                        },
                        label: {
                          show: true,
                          position: 'left',
                        },
                        series: [
                          {
                            name: data[val].name,
                            type: 'gauge',
                            detail: {
                              formatter: '{value}',
                              padding: [50, 3, 0, 3],
                              fontSize: 16,
                            },
                            title: {
                              fontSize: 15,
                            },
                            max: getTitle(data[val]).max,
                            data: [
                              {
                                value: getTitle(data[val]).value,
                                name: getTitle(data[val]).name,
                              },
                            ],
                          },
                        ],
                      }}
                    />
                  </Card>
                ) : (
                  data[val].show && <Card loading />
                )}
              </Col>
            );
          })}
        </Row>
      </Card>
      {loading ? (
        <Card loading />
      ) : (
        <Card>
          {deviceNameArr.map((val, index) => {
            return data[val].show && data[val].Line && data[val].data.length !== 0 ? (
              <Card style={{ marginBottom: '10px' }}>
                <ReactEcharts
                  echarts={echarts}
                  notMerge
                  lazyUpdate
                  key={index.toString()}
                  option={{
                    title: {
                      text: getTitle(data[val]).title,
                    },
                    xAxis: {
                      type: 'time',
                      splitLine: {
                        show: false,
                      },
                    },
                    tooltip: {
                      trigger: 'axis',
                    },
                    yAxis: {
                      type: 'value',
                      boundaryGap: [0, '100%'],
                      splitLine: {
                        show: false,
                      },
                      min(value) {
                        return value.min;
                      },
                      // max(value) {
                      //   return value.max
                      // }
                    },
                    series: [
                      {
                        name: data[val].name,
                        type: 'line',
                        smooth: true,
                        data: data[val].data,
                      },
                    ],
                  }}
                />
              </Card>
            ) : (
              data[val].show && <Card loading />
            );
          })}
        </Card>
      )}
    </div>
  );
};

export default DeviceTypeIsA;
