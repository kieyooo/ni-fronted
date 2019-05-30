/* eslint-disable consistent-return */
import React, { Component } from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import DeviceTypeIsA from './A';
// import DeviceTypeIsB from './B'
import { transformDataToEchartsB, transformDataToEchartsA } from './dataTool';

@connect(({ device, loading }) => ({
  devicesCollection: device.devicesCollection,
  deviceListByDeviceName: device.deviceListByDeviceName,
  getDataLoading: loading.effects['device/getDevicesById'],
}))
class WorkShopTwo extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type: 'device/deleteList' });
    dispatch({ type: 'device/getDevicesCollection' });
    this.getData();
    this.timer = setInterval(() => {
      this.getData();
    }, 3000);
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    clearInterval(this.timer);
    dispatch({ type: 'device/deleteList' });
  }

  getData = () => {
    const { devicesCollection, match, dispatch } = this.props;
    if (!devicesCollection || Object.keys(devicesCollection).length === 0) return [];
    const deviceList = devicesCollection[match.params.deviceName];
    deviceList.forEach(val => {
      if (val.argName !== 'Datatime' && val.argName !== 'Status') {
        dispatch({
          type: 'device/getDevicesById',
          payload: {
            id: val.id,
            size: 1,
          },
        });
      }
    });
  };

  getDeviceName = path => {
    return path.split('.')[1];
  };

  // 将数据转换成折线图数据格式
  TransformDataToChart = type => {
    const { deviceListByDeviceName } = this.props;
    switch (type) {
      case 'A':
        return transformDataToEchartsA(deviceListByDeviceName);
      case 'B':
        return transformDataToEchartsB(deviceListByDeviceName);
      default:
        return [];
    }
  };

  render() {
    const { match, deviceListByDeviceName } = this.props;
    const { type } = match.params;
    const { newData, deviceName } = this.TransformDataToChart(type);
    return (
      <PageHeaderWrapper>
        {deviceListByDeviceName && deviceListByDeviceName.length !== 0 && type === 'A' && (
          <DeviceTypeIsA data={newData} deviceName={deviceName} />
        )}
        {deviceListByDeviceName &&
          deviceListByDeviceName.length !== 0 &&
          type === 'B' &&
          // <DeviceTypeIsB data={newData} deviceName={deviceName} />
          null}
        {deviceListByDeviceName && deviceListByDeviceName.length !== 0 && type === 'C' && null}
        {deviceListByDeviceName && deviceListByDeviceName.length === 0 && <Card loading />}
      </PageHeaderWrapper>
    );
  }
}

export default WorkShopTwo;
