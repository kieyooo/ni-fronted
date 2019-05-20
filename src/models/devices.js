import * as services from '@/services/device';

export default {
  namespace: 'device',

  state: {
    deviceList: [],
    deviceListById: [],
  },

  effects: {
    *getDevices(_, { put, call }) {
      const res = yield call(services.getDevices);
      yield put({
        type: 'updateDeviceList',
        payload: res,
      });
    },
    *getDevicesById({ payload }, { put, call }) {
      const res = yield call(services.getDevicesById, payload);
      yield put({
        type: 'updateDeviceListById',
        payload: res,
      });
    },
  },

  reducers: {
    updateDeviceList(state, { payload }) {
      return {
        ...state,
        deviceList: payload,
      };
    },
    updateDeviceListById(state, { payload }) {
      return {
        ...state,
        deviceListById: payload,
      };
    },
  },
};
