import React, { Fragment } from 'react';
import { Card } from 'antd';
import echarts from '@/common/importEchart';
import ReactEcharts from 'echarts-for-react';

const DeviceTypeIsC = ({ data }) => {
  const deviceNameArr = Object.keys(data);
  return (
    <Fragment>
      <Card style={{ marginBottom: '15px' }}>
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
                    text: data[val].name,
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
            data[val].show && data[val].Line && <Card loading />
          );
        })}
      </Card>
    </Fragment>
  );
};

export default DeviceTypeIsC;
