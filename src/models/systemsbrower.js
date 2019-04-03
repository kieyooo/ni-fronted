import { discoveredSystems } from '@/services/systemsmanagement';
import { serializeTableData, serializeBrowserData } from '@/utils/serializeData';

export default {
  namespace: 'systemsbrower',
  state: {
    iserror: false,
    tableData: [],
    browserData: [],
  },

  effects: {
    *gettableData(_, { put, call }) {
      const response = yield call(discoveredSystems);
      if (response.result) {
        const data = serializeTableData(response.result);
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
