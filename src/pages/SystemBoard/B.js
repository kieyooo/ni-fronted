import React, { Fragment } from 'react';
import { Card } from 'antd';
import echarts from '@/common/importEchart';
import ReactEcharts from 'echarts-for-react';

const DeviceTypeIsB = ({ data, deviceName }) => {
  return (
    <Fragment>
      {data && data[0].length !== 0 ? (
        data.map((val, index) => {
          return (
            <Card key={index.toString()} style={{ marginBottom: '15px' }}>
              <ReactEcharts
                notMerge
                lazyUpdate
                echarts={echarts}
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
        })
      ) : (
        <Card loading />
      )}
    </Fragment>
  );
};

export default DeviceTypeIsB;
