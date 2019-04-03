import React, { Component } from 'react';
import { Icon, Input, Row, Col, Card } from 'antd';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { isArray } from 'util';

@connect(({systemsbrower, loading }) => ({
  ...systemsbrower,
  // getting: loading.effects['systemsbrower/getBrowserData']
}))
class WorkShopTwo extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'systemsbrower/getBrowserData'
    })
  }

  ipadressToCol = (params,params1) => {
    return  isArray(params) && params.length !== 0 ? params.map((value, index) => {
      return (
        <Row key={index.toString()}>
          <Col>{`${value}(${params1[index]})`}</Col>
        </Row>)})
      : '无法使用'
  }

  render() {
    const { browserData, getting, match } = this.props;
    const data = browserData.length === 0  ? {} : browserData.filter(value => value.MinionID === match.params.path)[0]
    return (
      <PageHeaderWrapper>
        <Card loading={getting} title='系统设置'>
          <Row>
            <Col xs={8} md={4} style={{fontWeight:'700'}}>主机名:</Col>
            {data.Connection === "已连接" ? (
              <Col xs={10} md={8}>
                <Input defaultValue={data.Name?data.Name:data.MinionID} />
              </Col>
            ) : (
              <Col xs={10} md={8}>
                {data.Name?data.Name:data.MinionID}
              </Col>
            )}
          </Row>
          <Row style={{ marginTop: "10px" }}>
            <Col xs={8} md={4} style={{fontWeight:'700'}}>IP地址:</Col>
            <Col xs={10} md={12}>
              {this.ipadressToCol(data.IPAddress, data.hwaddr_interfaces)
                ?this.ipadressToCol(data.IPAddress, data.hwaddr_interfaces)
                : '无法使用'}
            </Col>
          </Row>
          <Row style={{ marginTop: "10px" }}>
            <Col xs={8} md={4} style={{fontWeight:'700'}}>FQDN:</Col>
            <Col xs={10} md={12}>{data.FQDN ? data.FQDN :'无法使用'}</Col>
          </Row>
          <Row style={{ marginTop: "10px" }}>
            <Col xs={8} md={4} style={{fontWeight:'700'}}>连接状态:</Col>
            <Col xs={10} md={12}>
              {data.Connection === "已连接" ? (
                <div>已连接 <Icon type="check" style={{marginLeft: "5px",color: "#52c41a",fontSize: "12px"}} /></div>
              ) : (
                <div>未连接 <Icon type="close" style={{marginLeft: "5px",color: "#c42126",fontSize: "12px"}} /></div>
              )}
            </Col>
          </Row>
          <Row style={{ marginTop: "10px" }}>
            <Col xs={8} md={4} style={{fontWeight:'700'}}>上锁状态:</Col>
            <Col xs={10} md={12}>否</Col>
          </Row>
          <Row style={{ marginTop: "10px" }}>
            <Col xs={8} md={4} style={{fontWeight:'700'}}> 宿主机:</Col>
            <Col xs={10} md={12}>{data.Master ? ( isArray(data.Master) ? data.Master[0] : data.Master) : '无法使用'}</Col>
          </Row>
          <Row style={{ marginTop: "10px" }}>
            <Col xs={8} md={4} style={{fontWeight:'700'}}>供应商:</Col>
            <Col xs={10} md={12}>{data.Vendor ? data.Vendor : '无法使用'}</Col>
          </Row>
          <Row style={{ marginTop: "10px" }}>
            <Col xs={8} md={4} style={{fontWeight:'700'}}>模型名:</Col>
            <Col xs={10} md={12}>{data.ModelName ? data.ModelName : '无法使用'}</Col>
          </Row>
          <Row style={{ marginTop: "10px" }}>
            <Col xs={8} md={4} style={{fontWeight:'700'}}>序列号:</Col>
            <Col xs={10} md={12}>{data.SerialNumber ? data.SerialNumber : '无法使用'}</Col>
          </Row>
          <Row style={{ marginTop: "10px" }}>
            <Col xs={8} md={4} style={{fontWeight:'700'}}>操作系统:</Col>
            <Col xs={10} md={12}>{data.OperatingSystem ? data.OperatingSystem : '无法使用'}</Col>
          </Row>
          <Row style={{ marginTop: "10px" }}>
            <Col xs={8} md={4} style={{fontWeight:'700'}}>系统开始时间:</Col>
            <Col xs={10} md={20}>{ data.SystemStartTime ? data.SystemStartTime : '失效日期'}</Col>
          </Row>
          <Row style={{ marginTop: "10px" }}>
            <Col xs={8} md={4} style={{fontWeight:'700'}}>所属地：</Col>
            <Col xs={10} md={12}>{data.Locale ? data.Locale : '无法使用'}</Col>
          </Row>
          <Row style={{ marginTop: "10px" }}>
            <Col xs={8} md={4} style={{fontWeight:'700'}}>评论：</Col>
            {data.Connection === "已连接" ? (
              <Col xs={10} md={8}>
                <Input.TextArea
                  defaultValue={data.Comments}
                  autosize={{ minRows: 2, maxRows: 6 }}
                />
              </Col>
            ) : (
              <Col xs={10} md={12}>{data.Comments}</Col>
            )}
          </Row>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default WorkShopTwo;