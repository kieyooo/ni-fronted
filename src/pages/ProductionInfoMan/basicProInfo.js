import React from 'react';
import { connect } from 'dva'
import MyECharts from '@/components/ECharts'
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

@connect(({ tag }) => ({
  tagIsLBH : tag.tagIsLBH
}))
class BasicProInfo extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type: 'tag/getTagIsLBH'});
  }

  render() {
    const { tagIsLBH } = this.props;
    {console.log(tagIsLBH)}
    return (
      <PageHeaderWrapper>
        <MyECharts />
      </PageHeaderWrapper>
    );
  }
}

export default BasicProInfo
