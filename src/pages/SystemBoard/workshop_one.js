import React, { Component } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Card, Row, Col, List, Icon } from 'antd';
import { connect } from 'dva';
import router from 'umi/router';
import styles from './workshop_one.less';
// import Ellipsis from '@/components/Ellipsis'

const { Meta } = Card;

@connect(({ systemsmanagement, systemsbrower }) => ({
  connected: systemsmanagement.connected,
  disconnected: systemsmanagement.disconnected,
  tableData: systemsbrower.tableData,
}))
class DeviceList extends Component {
  state = {};

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type: 'systemsmanagement/getManagedNumber' });
    dispatch({ type: 'systemsbrower/gettableData' });
  }

  runTo = path => {
    router.push(`/device/${path}`);
  };

  render() {
    const Info = ({ title, value, bordered }) => (
      <div className={styles.headerInfo}>
        <span>{title}</span>
        <p>{value}</p>
        {bordered && <em />}
      </div>
    );
    const { connected, disconnected, tableData } = this.props;
    return (
      <PageHeaderWrapper>
        <div className={styles.standardList}>
          <Card bordered={false} style={{ marginBottom: '10px' }}>
            <Row>
              <Col sm={8} xs={24}>
                <Info title="设备总量" value={`${connected + disconnected}台`} bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title="已连接" value={`${connected}台`} bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title="未连接" value={`${disconnected}台`} />
              </Col>
            </Row>
          </Card>
        </div>
        <div className={styles.cardList}>
          <List
            // bordered
            dataSource={tableData}
            grid={{ gutter: 24, lg: 4, md: 2, sm: 1, xs: 1 }}
            renderItem={item =>
              item ? (
                <List.Item>
                  <Card
                    hoverable
                    onClick={() => this.runTo(item.MinionID)}
                    style={
                      item.Connection === '已连接'
                        ? { backgroundColor: '#b7eb8f' }
                        : { backgroundColor: '#d9d9d9' }
                    }
                  >
                    <Meta
                      avatar={<Icon type="cluster" style={{ fontSize: '28px' }} />}
                      title={item.Name}
                    />
                    <Row>
                      <Col span={24}>
                        <Row>
                          <Col xs={9} sm={12} md={8} lg={8} style={{fontWeight:'bolder'}}>连接状态：</Col>
                          <Col xs={15} sm={12} md={16} lg={16}>{item.Connection}</Col>
                        </Row>
                      </Col>
                      <Col span={24}>
                        <Row>
                          <Col xs={9} sm={12} md={8} lg={8} style={{fontWeight:'bolder'}}>开始时间：</Col>
                          <Col xs={15} sm={12} md={16} lg={16}>{item.SystemStartTime}</Col>
                        </Row>
                      </Col>
                    </Row>
                  </Card>
                </List.Item>
              ) : (
                <div />
              )
            }
          />
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default DeviceList;
