import React from 'react';
import { Card, Row, Col } from 'antd'
import { TimelineChart } from '@/components/Charts'
import { connect } from 'dva'
import { toFixed } from '@/utils/serializeData'
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

@connect(({ tag }) => ({
  tagIsLBH : tag.tagIsLBH
}))
class BasicProInfo extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type: 'tag/getTagIsLBH'});
  }

  tagDataAddToChart = (data) => {
    const newData = [
      {}
    ];

    return newData
  }

  render() {
    const { tagIsLBH } = this.props;
    return (
      <PageHeaderWrapper>
        {tagIsLBH[0] ? (
          <Row>
            {tagIsLBH[0].map((value,index) => {
            return (
              <Col xs={24} md={12} lg={8} key={index.toString()}>
                <Card style={{marginBottom:'8px',marginRight:'8px'}}>
                  <TimelineChart 
                    height={300}
                    data={[{x:(new Date().getTime()) + (1000 * 60 * 30),y1:toFixed(value.values,1), y2:toFixed(tagIsLBH[1][index].values,1)}]}
                    titleMap={{y1: '电流', y2: '电压'}}
                  />
                </Card>
              </Col> 
            )
          } )}
          </Row>
          
        ): null}
      </PageHeaderWrapper>
    );
  }
}

export default BasicProInfo
