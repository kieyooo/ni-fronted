import React from 'react';
import { Table, Card } from 'antd';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

@connect(({ table, loading }) => ({
  tableList: table.tableList,
  tableLoading: loading.effects['table/getDeviceTable'],
}))
class DeviceTagInfo extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type: 'table/getDeviceTable' });
    // this.timer = setInterval(() => {
    //   dispatch({ type: 'table/getDeviceTable'})
    // }, 5000);
  }

  // componentWillUnmount(){
  //   clearInterval(this.timer)
  // }

  render() {
    const { tableList, tableLoading } = this.props;
    const columns = [
      {
        title: '路径',
        dataIndex: 'Path',
        key: 'Path',
      },
      {
        title: '当前值',
        dataIndex: 'Current',
        key: 'Current',
      },
      {
        title: '更新时间',
        dataIndex: 'Timestamp',
        key: 'Timestamp',
        render(text) {
          return new Date(Date(text)).toLocaleString();
        },
      },
    ];
    return (
      <PageHeaderWrapper>
        <Card loading={tableLoading}>
          <Table
            columns={columns}
            dataSource={tableList}
            rowKey="Path"
            pagination={{
              showQuickJumper: true,
              hideOnSinglePage: true,
            }}
          />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default DeviceTagInfo;
