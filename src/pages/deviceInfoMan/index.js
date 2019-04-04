import React from 'react';
import { Table, Card, Row, Col } from 'antd'
import { connect } from 'dva'
import tableSort from '@/utils/tableSort'
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
    const { data, loading } = this.props;
    // data.forEach((value,index) => (value.key = index))
    return (
      <PageHeaderWrapper>
        <Card>
          <Row>
            <Col>
              <Table 
                columns={columns} 
                dataSource={data} 
                loading={loading} 
                pagination={{defaultPageSize:15,hideOnSinglePage:'ture',
                  showQuickJumper: 'ture',pageSizeOptions: ['10','15','25','35'],showSizeChanger: 'ture'}} 
              />
            </Col>
          </Row>
          
        </Card>
      </PageHeaderWrapper>
    )
  }
}

export default DeviceTagInfo
