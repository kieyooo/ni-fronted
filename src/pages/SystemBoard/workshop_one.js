import React, { Component } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Card, List, Icon } from 'antd';
import { connect } from 'dva';
import router from 'umi/router';
// import Ellipsis from '@/components/Ellipsis'

const { Meta } = Card;

@connect(({ device, loading }) => ({
  devicesCollection: device.devicesCollection,
  getDeviceLoading: loading.effects['device/getDevices'],
}))
class DeviceList extends Component {
  state = {};

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type: 'device/getDevicesCollection' });
  }

  runTo = (type, path) => {
    router.push(`/device/${type}/${path}`);
  };

  render() {
    const { getDeviceLoading, devicesCollection } = this.props;
    const { runTo } = this;
    return (
      <PageHeaderWrapper>
        {/* <Card style={{ marginBottom: '15px' }}>
          <Card.Grid>设备总数</Card.Grid>
          <Card.Grid>在线</Card.Grid>
          <Card.Grid>离线</Card.Grid>
          <Card.Grid>故障</Card.Grid>
          <Card.Grid>生产</Card.Grid>
          <Card.Grid>停机</Card.Grid>
          <Card.Grid>保养</Card.Grid>
        </Card> */}
        {devicesCollection && Object.keys(devicesCollection).length !== 0 ? (
          <Card title="智能电表" style={{ marginBottom: '15px' }}>
            <List
              rowKey="id"
              loading={getDeviceLoading}
              grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
              dataSource={Object.keys(devicesCollection).filter(ele => ele.startsWith('NBIot'))}
              renderItem={item =>
                item ? (
                  <List.Item key={item}>
                    <Card hoverable onClick={() => runTo('A', item)}>
                      <Meta
                        avatar={<Icon type="cluster" style={{ fontSize: '20px' }} />}
                        title={item}
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
        {devicesCollection && Object.keys(devicesCollection).length !== 0 ? (
          <Card title="实验云设备" style={{ marginBottom: '15px' }}>
            <List
              rowKey="id"
              loading={getDeviceLoading}
              grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
              dataSource={Object.keys(devicesCollection).filter(
                ele => !(ele.startsWith('NBIot') || ele.startsWith('Wafer') || ele.startsWith('RF'))
              )}
              renderItem={item =>
                item ? (
                  <List.Item key={item}>
                    <Card hoverable onClick={() => runTo('A', item)}>
                      <Meta
                        avatar={<Icon type="cluster" style={{ fontSize: '20px' }} />}
                        title={item}
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
        {devicesCollection && Object.keys(devicesCollection).length !== 0 ? (
          <Card title="射频测试设备" style={{ marginBottom: '15px' }}>
            <List
              rowKey="id"
              loading={getDeviceLoading}
              grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
              dataSource={Object.keys(devicesCollection).filter(
                ele => ele.startsWith('Wafer') || ele.startsWith('RF')
              )}
              renderItem={item =>
                item ? (
                  <List.Item key={item}>
                    <Card hoverable onClick={() => runTo('A', item)}>
                      <Meta
                        avatar={<Icon type="cluster" style={{ fontSize: '20px' }} />}
                        title={item}
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
      </PageHeaderWrapper>
    );
  }
}

export default DeviceList;
