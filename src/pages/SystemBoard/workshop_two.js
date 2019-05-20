import React, { Component } from 'react';
import { Alert } from 'antd';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import DeviceTypeIsA from './A';

@connect(({ device, loading }) => ({
  deviceListById: device.deviceListById,
  getDataLoading: loading.effects['device/getDevicesById'],
}))
class WorkShopTwo extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    const { match } = this.props;
    dispatch({
      type: 'device/getDevicesById',
      payload: {
        id: match.params.id,
        size: 10,
      },
    });
    this.timer = setInterval(() => {
      dispatch({
        type: 'device/getDevicesById',
        payload: {
          id: match.params.id,
          size: 10,
        },
      });
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  getDeviceName = data => {
    if (data.length === 0) return '';
    return data[0].path.split('.')[1];
  };

  TransformDataToChart = () => {
    const newData = [];
    const { deviceListById } = this.props;
    if (deviceListById.length === 0) return [];

    deviceListById.forEach(value => {
      newData.push({
        x: new Date(value.timestamp.timestamp).getTime(),
        y1: Number(value.value).toFixed(4),
      });
    });
    return newData;
  };

  render() {
    const { deviceListById, match } = this.props;
    const { type } = match.params;
    const deviceName = this.getDeviceName(deviceListById);
    const data = this.TransformDataToChart();
    return (
      <PageHeaderWrapper>
        {deviceListById.length !== 0 && type === 'A' && (
          <DeviceTypeIsA data={data} deviceName={deviceName} />
        )}
        {deviceListById.length !== 0 && type === 'B' && (
          <Alert type="error" message="施工中" showIcon />
        )}
        {deviceListById.length !== 0 && type === 'C' && (
          <Alert type="error" message="施工中" showIcon />
        )}
      </PageHeaderWrapper>
    );
  }
}

export default WorkShopTwo;
