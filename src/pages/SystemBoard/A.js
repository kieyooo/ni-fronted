import React from 'react';
import { Card, Row, Col } from 'antd';
import { Gauge, TimelineChart } from '@/components/Charts';

function getTitle(name) {
  switch (name) {
    case 'Power waste ':
      return 'KW';
    case 'Voltage':
      return 'V';
    case 'Current':
      return 'A';
    default:
      return '';
  }
}

const DeviceTypeIsA = ({ data, deviceName, loading }) => {
  return (
    <div>
      <Card style={{ marginBottom: '10px' }} loading={loading} title="仪表盘">
        <Row gutter={8}>
          {data.map((val, index) => {
            return (
              <Col key={index.toString()} md={8} xs={24}>
                <Card title={deviceName[index]}>
                  <Gauge
                    title={getTitle(deviceName[index])}
                    height={164}
                    percent={data[index] && data[index][0] && data[index][0].y1}
                  />
                </Card>
              </Col>
            );
          })}
        </Row>
      </Card>
      {loading ? (
        <Card loading />
      ) : (
        <Card style={{ marginBottom: '10px' }} title="折线图">
          {data.map((val, index) => {
            if (val && val.length !== 0) {
              return (
                <Card
                  title={deviceName[index]}
                  key={index.toString()}
                  style={{ marginBottom: '10px' }}
                >
                  <TimelineChart
                    height={300}
                    data={data[index]}
                    titleMap={{ y1: deviceName[index] }}
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
