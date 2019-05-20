import React, { Component } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Card, List, Icon } from 'antd';
import { connect } from 'dva';
import router from 'umi/router';
// import Ellipsis from '@/components/Ellipsis'

const { Meta } = Card;

@connect(({ device, loading }) => ({
  deviceList: device.deviceList,
  getDeviceLoading: loading.effects['device/getDevices'],
}))
class DeviceList extends Component {
  state = {};

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type: 'device/getDevices' });
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  runTo = (type, path) => {
    router.push(`/device/${type}/${path}`);
  };

  render() {
    const { deviceList, getDeviceLoading } = this.props;
    const { runTo } = this;
    return (
      <PageHeaderWrapper>
        <Card style={{ marginBottom: '15px' }}>
          <Card.Grid>设备总数</Card.Grid>
          <Card.Grid>在线</Card.Grid>
          <Card.Grid>离线</Card.Grid>
          <Card.Grid>故障</Card.Grid>
          <Card.Grid>生产</Card.Grid>
          <Card.Grid>停机</Card.Grid>
          <Card.Grid>保养</Card.Grid>
        </Card>
        {deviceList.length !== 0 ? (
          <Card title="A类设备" style={{ marginBottom: '15px' }}>
            <List
              rowKey="id"
              loading={getDeviceLoading}
              grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
              dataSource={deviceList.filter(
                ele => ele.type === 'NBIot' && ele.argName !== 'Datatime'
              )}
              renderItem={item =>
                item ? (
                  <List.Item key={item.id}>
                    <Card hoverable onClick={() => runTo('A', item.id)}>
                      <Meta
                        avatar={<Icon type="cluster" style={{ fontSize: '20px' }} />}
                        title={`${item.type};${item.deviceName};${item.argName}`}
                      />
                    </Card>
                  </List.Item>
                ) : null
              }
            />
          </Card>
        ) : (
          <Card loading />
        )}
        {deviceList.length !== 0 ? (
          <Card title="B类设备" style={{ marginBottom: '15px' }}>
            <List
              rowKey="id"
              loading={getDeviceLoading}
              grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
              dataSource={deviceList.filter(ele => ele.type === 'ShiYanBan')}
              renderItem={item =>
                item ? (
                  <List.Item key={item.id}>
                    <Card hoverable onClick={() => runTo('B', item.id)}>
                      <Meta
                        avatar={<Icon type="cluster" style={{ fontSize: '20px' }} />}
                        title={`${item.type};${item.deviceName};${item.argName}`}
                      />
                    </Card>
                  </List.Item>
                ) : null
              }
            />
          </Card>
        ) : null}
        {deviceList.length !== 0 ? (
          <Card title="C类设备" style={{ marginBottom: '15px' }}>
            <List
              rowKey="id"
              loading={getDeviceLoading}
              grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
              dataSource={deviceList.filter(
                ele => ele.type === 'Wafer_Test' || ele.type === 'RF_Test'
              )}
              renderItem={item =>
                item ? (
                  <List.Item key={item.id}>
                    <Card hoverable onClick={() => runTo('C', item.id)}>
                      <Meta
                        avatar={<Icon type="cluster" style={{ fontSize: '20px' }} />}
                        title={`${item.type};${item.deviceName};${item.argName}`}
                      />
                    </Card>
                  </List.Item>
                ) : null
              }
            />
          </Card>
        ) : null}
      </PageHeaderWrapper>
    );
  }
}

export default DeviceList;
