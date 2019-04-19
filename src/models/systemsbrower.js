import { discoveredSystems } from '@/services/systemsmanagement';
import { serializeTableData, serializeBrowserData } from '@/utils/serializeData';

export default {
  namespace: 'systemsbrower',
  state: {
    tableData: [], // 列表中的设备信息
    browserData: [], // 设备详情
  },

  effects: {
    *gettableData(_, { put, call }) {
      const response = yield call(discoveredSystems);
      if (response.result) {
        const data = serializeTableData(response.result); // 对信息进行处理
        yield put({ type: 'updateTableData', payload: { data } });
      }
    },
    *getBrowserData(_, { put, call }) {
      const response = yield call(discoveredSystems);
      if (response.result) {
        const data = serializeBrowserData(response.result);
        yield put({ type: 'updateBrowserData', payload: { data } });
      }
    },
  },

  reducers: {
    updateTableData(state, { payload }) {
      return { ...state, tableData: payload.data };
    },
    updateBrowserData(state, { payload }) {
      return { ...state, browserData: payload.data };
    },
  },

  subscriptions: {},
};
