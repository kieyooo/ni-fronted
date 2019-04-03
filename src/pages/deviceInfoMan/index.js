import React from 'react';
import { Table, Card, Row, Col } from 'antd'
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

  sort  = (a, b) => {
    a = a === null || a === undefined ? '' : a
    b = b === null || b === undefined ? '' : b
    a = typeof a === 'string' ? a.toLowerCase() : a
    b = typeof b === 'string' ? b.toLowerCase() : b
    if (a > b) {
      return 1
    }
    if (a < b) {
      return -1
    }
    return 0
  }

  render() {
    const { sort } = this
    const columns = [{
      title: '路径',
      dataIndex: 'Path',
      sorter: (a, b) => sort(a,b),
    },{
      title: '当前值',
      dataIndex: 'CurrentValue',
      sorter: (a, b) => a.CurrentValue - b.CurrentValue,
    },{
      title: '总数',
      dataIndex: 'Count',
      sorter: (a, b) => a.Count - b.Count,
    },{
      title: '更新时间',
      dataIndex: 'Updated',
      sorter: (a, b) => sort(a,b),
    }];
    const { data, loading } = this.props;
    data.forEach((value,index) => (value.key = index))
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
      }),
    };
    return (
      <PageHeaderWrapper>
        <Card>
          <Row>
            <Col>
              <Table rowSelection={rowSelection} columns={columns} dataSource={data} loading={loading} />
            </Col>
          </Row>
          
        </Card>
      </PageHeaderWrapper>
    )
  }
}

export default DeviceTagInfo
