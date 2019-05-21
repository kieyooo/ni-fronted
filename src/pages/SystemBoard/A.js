import React from 'react';
import { Card } from 'antd';
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
  const name = getTitle(deviceName);
  return (
    <div>
      <Card style={{ marginBottom: '10px' }} loading={loading}>
        <Gauge title={name} height={164} percent={data[0] && data[0].y1} />
      </Card>
      {loading ? (
        <Card loading />
      ) : (
        <Card style={{ marginBottom: '10px' }}>
          <TimelineChart height={600} data={data} titleMap={{ y1: deviceName }} />
        </Card>
      )}
    </div>
  );
};

export default DeviceTypeIsA;
