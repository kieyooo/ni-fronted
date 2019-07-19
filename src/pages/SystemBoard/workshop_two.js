/* eslint-disable consistent-return */
import React, { Component } from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import DeviceTypeIsA from './A';
import DeviceTypeIsB from './B';
import DeviceTypeIsC from './C';
import { transformDataToEcharts, clearDataList } from './dataTool';

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
    clearDataList();
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
    return transformDataToEcharts(deviceListByDeviceName, type);
  };

  render() {
    const { match, deviceListByDeviceName } = this.props;
    const { type } = match.params;
    const { deviceData } = this.TransformDataToChart(type);
    return (
      <PageHeaderWrapper>
        {deviceListByDeviceName && deviceListByDeviceName.length !== 0 && type === 'A' && (
          <DeviceTypeIsA data={deviceData} />
        )}
        {deviceListByDeviceName && deviceListByDeviceName.length !== 0 && type === 'B' && (
          <DeviceTypeIsB data={deviceData} />
        )}
        {deviceListByDeviceName && deviceListByDeviceName.length !== 0 && type === 'C' && (
          <DeviceTypeIsC data={deviceData} />
        )}
        {deviceListByDeviceName && deviceListByDeviceName.length === 0 && <Card loading />}
      </PageHeaderWrapper>
    );
  }
}

export default WorkShopTwo;
