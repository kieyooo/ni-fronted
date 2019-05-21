/* eslint-disable consistent-return */
import React, { Component } from 'react';
import { connect } from 'dva';
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
            size: 10,
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
      if (value.path === 'ZhongShan;NBIot;NBIot_meter.Power waste ') {
        deviceNameArr[0] = this.getDeviceName(value.path);
        newData[0].push({
          x: new Date(value.timestamp.timestamp).getTime(), // 图表时间戳
          y1: Number(value.value).toFixed(4), // 数据源
        });
      }
      if (value.path === 'ZhongShan;NBIot;NBIot_meter.Voltage') {
        deviceNameArr[1] = this.getDeviceName(value.path);
        newData[1].push({
          x: new Date(value.timestamp.timestamp).getTime(), // 图表时间戳
          y1: Number(value.value).toFixed(4), // 数据源
        });
      }
      if (value.path === 'ZhongShan;NBIot;NBIot_meter.Current') {
        deviceNameArr[2] = this.getDeviceName(value.path);
        newData[2].push({
          x: new Date(value.timestamp.timestamp).getTime(), // 图表时间戳
          y1: Number(value.value).toFixed(4), // 数据源
        });
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
      </PageHeaderWrapper>
    );
  }
}

export default WorkShopTwo;
