import getDeviceTable from '@/services/table';

export default {
  namespace: 'table',
  state: {
    tableList: [],
  },
  effects: {
    *getDeviceTable(_, { call, put }) {
      const res = yield call(getDeviceTable);
      yield put({
        type: 'updateTableList',
        payload: res,
      });
    },
  },
  reducers: {
    updateTableList(state, { payload }) {
      return {
        ...state,
        tableList: payload,
      };
    },
  },
};
