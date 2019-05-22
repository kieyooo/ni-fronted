/* eslint-disable consistent-return */
import React, { Component } from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import DeviceTypeIsA from './A';

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
    }, 5000);
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
      if (val.argName !== 'Datatime') {
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
  TransformDataToChart = () => {
    const newData = [[], [], []];
    const deviceNameArr = [];
    const { deviceListByDeviceName } = this.props;
    if (!deviceListByDeviceName) return;
    if (deviceListByDeviceName.length === 0) return [];

    deviceListByDeviceName.forEach(value => {
      const temp = {
        x: new Date(value.timestamp.timestamp).getTime(), // 图表时间戳
        y1: Number(Number(value.value).toFixed(2)), // 数据源
      };
      if (value.path.includes('Power waste ')) {
        deviceNameArr[0] = this.getDeviceName(value.path);
        if (newData[0].length === 0) newData[0].unshift(temp);
        if (new Date(value.timestamp.timestamp).getTime() !== newData[0][0].x) {
          newData[0].unshift(temp);
        }
        if (newData[0].length > 15) newData[0].pop();
      }
      if (value.path.includes('Voltage')) {
        deviceNameArr[1] = this.getDeviceName(value.path);
        if (newData[1].length === 0) newData[1].unshift(temp);
        if (new Date(value.timestamp.timestamp).getTime() !== newData[1][0].x) {
          newData[1].unshift(temp);
        }
        if (newData[1].length > 15) newData[1].pop();
      }
      if (value.path.includes('Current')) {
        deviceNameArr[2] = this.getDeviceName(value.path);
        if (newData[2].length === 0) newData[2].unshift(temp);
        if (new Date(value.timestamp.timestamp).getTime() !== newData[2][0].x) {
          newData[2].unshift(temp);
        }
        if (newData[2].length > 15) newData[2].pop();
      }
    });
    return {
      newData,
      deviceNameArr,
    };
  };

  render() {
    const { match, deviceListByDeviceName } = this.props;
    const { type } = match.params;
    const { newData, deviceNameArr } = this.TransformDataToChart();
    return (
      <PageHeaderWrapper>
        {deviceListByDeviceName && deviceListByDeviceName.length !== 0 && type === 'A' && (
          <DeviceTypeIsA data={newData} deviceName={deviceNameArr} />
        )}
        {deviceListByDeviceName && deviceListByDeviceName.length === 0 && <Card loading />}
      </PageHeaderWrapper>
    );
  }
}

export default WorkShopTwo;
