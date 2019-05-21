import * as services from '@/services/device';

export default {
  namespace: 'device',

  state: {
    deviceList: [],
    deviceListByDeviceName: [],
    deviceListById: [],
    devicesCollection: {},
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
      yield put({
        type: 'updateDeviceListByDeviceName',
        payload: res,
      });
    },
    *getDevicesCollection(_, { put, call }) {
      const res = yield call(services.getDevicesCollection);
      yield put({
        type: 'updaeDevicesCollection',
        payload: res,
      });
    },
    *deleteList(_, { put }) {
      yield put({ type: 'deleteDeviceListByDeviceName', payload: [] });
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
    updaeDevicesCollection(state, { payload }) {
      return {
        ...state,
        devicesCollection: payload,
      };
    },
    updateDeviceListByDeviceName(state, { payload }) {
      const deviceListByDeviceName = state.deviceListByDeviceName.concat(payload);
      return {
        ...state,
        deviceListByDeviceName,
      };
    },
    deleteDeviceListByDeviceName(state, { payload }) {
      return {
        ...state,
        deviceListByDeviceName: payload,
      };
    },
  },
};
