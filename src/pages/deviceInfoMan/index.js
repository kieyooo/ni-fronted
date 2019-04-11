import React from 'react';
import { Table, Card, Row, Col } from 'antd'
import { connect } from 'dva'
import tableSort from '@/utils/tableSort'
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

@connect(({ tag }) => ({
  ...tag
}))
class DeviceTagInfo extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'tag/tag'
    })
    this.timer = setInterval(() => {
      dispatch({ type: 'tag/tag' })
    }, 3000);
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  render() {
    const columns = [{
      title: '路径',
      dataIndex: 'Path',
      sorter: (a, b) => tableSort(a.Path, b.Path),
    },{
      title: '当前值',
      dataIndex: 'CurrentValue',
      sorter: (a, b) => tableSort(a.CurrentValue, b.CurrentValue),
    },{
      title: '总数',
      dataIndex: 'Count',
      sorter: (a, b) => tableSort(a.Count, b.Count),
    },{
      title: '更新时间',
      dataIndex: 'Updated',
      sorter: (a, b) => tableSort(a.Updated, b.Updated),
    }];
    const { data } = this.props;
    return (
      <PageHeaderWrapper>
        <Card>
          <Row>
            <Col span={24}>
              <Table 
                columns={columns} 
                dataSource={data} 
                rowKey="Path"
                loading={data.length === 0} 
                pagination={{defaultPageSize:15,hideOnSinglePage:true,
                  showQuickJumper:true ,pageSizeOptions: ['10','15','25','35'],showSizeChanger: true}} 
              />
            </Col>
          </Row>
          
        </Card>
      </PageHeaderWrapper>
    )
  }
}

export default DeviceTagInfo
