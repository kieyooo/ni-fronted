import React from 'react';
import { Card, Row, Col, Tag, Alert } from 'antd';
import { TimelineChart } from '@/components/Charts';
import { connect } from 'dva';
import { toFixed } from '@/utils/serializeData';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

@connect(({ tag }) => ({
  tagIsLBH: tag.tagIsLBH,
  tagArrByLBH: tag.tagArrByLBH
}))
class BasicProInfo extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type : 'tag/getTagArrByLBH'})
    this.timer = setInterval(() => {
      dispatch({ type: 'tag/getTagArrByLBH' });
    }, 3000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  tagData = (newData) => {
    const tagdata = [];
    if(newData.length === 0) return 
    const currentArr = [];
    const voltageArr = [];
    // eslint-disable-next-line no-plusplus
    for(let i = 0; i <= 6; i++) {
      currentArr[i] = [];
      newData[i].map(value => currentArr[i].push(toFixed(value[0].value,1)));
      voltageArr[i] = [];
      newData[i + 7].map(value => voltageArr[i].push(toFixed(value[0].value,1)))
    }
    // eslint-disable-next-line no-plusplus
    for(let i = 0; i <= 6; i++) {
      const temp = [];
      currentArr[i].forEach((value,ind) => {
        temp.push({
          x : (new Date().getTime()) - (1000  * 3 * ind),
          y1: value,
          y2: voltageArr[i][ind]
        })
        tagdata[i] = temp;
      })
    }
    // eslint-disable-next-line consistent-return
    return tagdata;
  }

  isDisConnect = (newdata) => {
    if(newdata.length === 0) return 
    const now = new Date().getTime();
    const isDisConnect = now - new Date(newdata[0][0][0].timestamp.timestamp).getTime()> 1000 * 60 * 2 
                  && now - new Date(newdata[7][0][0].timestamp.timestamp ).getTime()> 1000 * 60 * 2;
    // eslint-disable-next-line consistent-return
    return isDisConnect;
  }

  render() {
    const {  tagArrByLBH } = this.props;
    const { tagData, isDisConnect } = this;
    const tagdata = tagData(tagArrByLBH)
    const disConnect = isDisConnect(tagArrByLBH);

    return (
      <PageHeaderWrapper>
        {
          tagArrByLBH[0] ? (
            <Row>
              {!disConnect ? tagdata.map((value, index) => {
                return (
                  <Col xs={24} md={12} lg={12} key={index.toString()}>
                    <Card style={{ marginBottom: '10px', marginRight: '10px' }} title={`LBH${index}`}>
                      <Row>
                        <Col span={12}>
                          <Row>
                            <Col xs={6} md={6} xl={4}>
                                电流:
                            </Col>
                            <Col xs={18} md={18} xl={18}>
                              <Tag style={{ padding: '0 30px' }}>
                                {tagdata[index][0].y1}
                              </Tag>
                            </Col>
                          </Row>
                        </Col>
                        <Col span={12}>
                          <Row>
                            <Col xs={6} md={6} xl={4}>
                                电压:
                            </Col>
                            <Col xs={18} md={18} xl={18}>
                              <Tag style={{ padding: '0 30px' }}>
                                {tagdata[index][0].y2}
                              </Tag>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                      <TimelineChart
                        height={300}
                        data={tagdata[index]}
                        titleMap={{ y1: '电流', y2: '电压' }}
                      />
                    </Card>
                  </Col>
                );
              }): <Alert message="设备数据未更新,无法显示动态图表" type="error" showIcon />}
            </Row>
          ) : <Card loading />
        }
      </PageHeaderWrapper>
    );
  }
}

export default BasicProInfo;
