import React from 'react';

import { connect } from 'dva'
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

@connect(({tag, loading}) => ({
  ...tag,
  loading: loading.effects['tag/tag']
}))
class DeviceTagInfo extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'tag/tag'
    })
  }

  render() {
    return(
      <PageHeaderWrapper>
        <div>sss</div>
      </PageHeaderWrapper>
    )
  }

}

export default DeviceTagInfo
