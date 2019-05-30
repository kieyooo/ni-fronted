import React from 'react';
import { Card, Row, Col } from 'antd';
import echarts from '@/common/importEchart';
import ReactEcharts from 'echarts-for-react';

function getTitle(name, data, index) {
  const value = data[index][0].value[1];
  if (name.includes('Voltage')) {
    return {
      name: 'V',
      value: value.toFixed(2),
      max: 450,
    };
  }
  if (name.includes('Power waste')) {
    return {
      name: value < 1 ? 'W' : 'KW',
      value: value < 1 ? (value * 1000).toFixed(2) : value.toFixed(2),
      max: value < 1 ? 1000 : 100,
    };
  }
  if (name.includes('Current')) {
    return {
      name: value < 1 ? 'mA' : 'A',
      value: value < 1 ? (value * 1000).toFixed(2) : value.toFixed(2),
      max: value < 1 ? 1000 : 50,
    };
  }
  return {
    name: 'error',
    value: 0,
    max: 100,
  };
}

const DeviceTypeIsA = ({ data, deviceName, loading }) => {
  return (
    <div>
      <Card style={{ marginBottom: '10px' }} loading={loading}>
        <Row gutter={8}>
          {data[0].length !== 0 && data[1].length !== 0 && data[2].length !== 0 ? (
            data.map((val, index) => {
              return (
                <Col sm={24} lg={8} xs={24}>
                  <Card>
                    <ReactEcharts
                      echarts={echarts}
                      notMerge
                      key={index.toString()}
                      lazyUpdate
                      option={{
                        title: {
                          text: deviceName[index],
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
                            name: deviceName[index],
                            type: 'gauge',
                            detail: {
                              formatter: '{value}',
                              padding: [50, 3, 0, 3],
                              fontSize: 16,
                            },
                            title: {
                              fontSize: 15,
                            },
                            max: getTitle(deviceName[index], data, index).max,
                            data: [
                              {
                                value: getTitle(deviceName[index], data, index).value,
                                name: getTitle(deviceName[index], data, index).name,
                              },
                            ],
                          },
                        ],
                      }}
                    />
                  </Card>
                </Col>
              );
            })
          ) : (
            <Card loading />
          )}
        </Row>
      </Card>
      {loading ? (
        <Card loading />
      ) : (
        <Card>
          {data.map((val, index) => {
            if (val && val.length !== 0) {
              return (
                <Card style={{ marginBottom: '10px' }}>
                  <ReactEcharts
                    echarts={echarts}
                    notMerge
                    lazyUpdate
                    key={index.toString()}
                    option={{
                      title: {
                        text: deviceName[index],
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
                      },
                      series: [
                        {
                          name: deviceName[index],
                          type: 'line',
                          smooth: true,
                          data: data[index],
                        },
                      ],
                    }}
                  />
                </Card>
              );
            }
            return <Card loading />;
          })}
        </Card>
      )}
    </div>
  );
};

export default DeviceTypeIsA;
