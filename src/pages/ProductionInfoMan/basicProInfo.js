import React from 'react';
import { Card, Row, Col, Tag, Alert } from 'antd';
import { TimelineChart } from '@/components/Charts';
import { connect } from 'dva';
import { toFixed } from '@/utils/serializeData';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

@connect(({ tag }) => ({
  tagIsLBH: tag.tagIsLBH,
}))
class BasicProInfo extends React.Component {
  state = {
    tagdata: [], // 存储tag数据的数组
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type: 'tag/getTagIsLBH' });
    this.timer = setInterval(() => {
      dispatch({ type: 'tag/getTagIsLBH' });
    }, 3000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  tagDataAddToChart = (newdata, index) => {
    const { tagdata } = this.state;
    if (newdata[0].length === 0) return tagdata[index];
    const now = new Date().getTime();
    const y1 =
      now - new Date(newdata[0][index].timestamp).getTime() > 1000 * 60 * 2
        ? null
        : toFixed(newdata[0][index].values, 1);
    const y2 =
      now - new Date(newdata[1][index].timestamp).getTime() > 1000 * 60 * 2
        ? null
        : toFixed(newdata[1][index].values, 1);
    const data = {
      x: new Date().getTime(),
      y1,
      y2,
    };
    if (Array.isArray(tagdata[index])) {
      tagdata[index].push(data);
    } else {
      tagdata[index] = [data];
    }
    if (tagdata[index].length > 20) tagdata[index].shift();
    return tagdata[index];
  };

  render() {
    const { tagIsLBH } = this.props;
    const { tagDataAddToChart } = this;

    return (
      <PageHeaderWrapper>
        {tagIsLBH[0] ? (
          <Row>
            {tagIsLBH[0].map((value, index) => {
              return (
                <Col xs={24} md={12} lg={12} key={index.toString()}>
                  <Card style={{ marginBottom: '10px', marginRight: '10px' }} title={`LBH${index}`}>
                    {new Date().getTime() - new Date(tagIsLBH[0][index].timestamp).getTime() >
                      1000 * 60 * 2 &&
                    new Date().getTime() - new Date(tagIsLBH[1][index].timestamp).getTime() >
                      1000 * 60 * 2 ? (
                      // eslint-disable-next-line react/jsx-indent
                      <Alert type="error" message="设备数据未更新" showIcon />
                    ) : (
                      <Row>
                        <Col span={12}>
                          <Row>
                            <Col xs={6} md={6} xl={4}>
                              电流:
                            </Col>
                            <Col xs={18} md={18} xl={18}>
                              <Tag style={{ padding: '0 30px' }}>
                                {toFixed(tagIsLBH[0][index].values, 1)}
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
                                {toFixed(tagIsLBH[1][index].values, 1)}
                              </Tag>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    )}
                    <TimelineChart
                      height={300}
                      data={tagDataAddToChart(tagIsLBH, index)}
                      titleMap={{ y1: '电流', y2: '电压' }}
                    />
                  </Card>
                </Col>
              );
            })}
          </Row>
        ) : (
          <Card loading />
        )}
      </PageHeaderWrapper>
    );
  }
}

export default BasicProInfo;
