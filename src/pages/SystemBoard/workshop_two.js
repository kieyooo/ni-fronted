/* eslint-disable consistent-return */
import React, { Component } from 'react';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
// import DeviceTypeIsA from './A';

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

  componentWillUnmount() {
    clearInterval(this.timer);
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

  getDeviceName = data => {
    if (!data) return;
    if (data.length === 0) return '';
    return data[0].path.split('.')[1];
  };

  // 将数据转换成折线图数据格式
  TransformDataToChart = () => {
    const newData = [];
    const { deviceListById } = this.props;
    if (!deviceListById) return;
    if (deviceListById.length === 0) return [];

    deviceListById.forEach(value => {
      newData.push({
        x: new Date(value.timestamp.timestamp).getTime(), // 图表时间戳
        y1: Number(value.value).toFixed(4), // 数据源
      });
    });
    return newData;
  };

  render() {
    // const { match, deviceListByDeviceName } = this.props;
    // // console.log(deviceListByDeviceName);
    // const { type } = match.params;
    // const deviceName = this.getDeviceName(deviceListById);
    // const data = this.TransformDataToChart();
    return (
      <PageHeaderWrapper>
        {/* {deviceListByDeviceName && deviceListByDeviceName.length !== 0 && type === 'A' && null
        // <DeviceTypeIsA data={data} deviceName={deviceName} />
        } */}
        {/* {deviceListById && deviceListById.length !== 0 && type === 'B' && null}
         {deviceListById && deviceListById.length !== 0 && type === 'C' && null} } */}
      </PageHeaderWrapper>
    );
  }
}

export default WorkShopTwo;
