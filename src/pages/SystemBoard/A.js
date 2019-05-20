import React from 'react';
import { Card } from 'antd';
import { Gauge, TimelineChart } from '@/components/Charts';

const DeviceTypeIsA = ({ data, deviceName, loading }) => {
  return (
    <div>
      <Card style={{ marginBottom: '10px' }} loading={loading}>
        <Gauge title={deviceName} height={164} percent={data[0] && data[0].y1} />
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
