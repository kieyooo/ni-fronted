/* eslint-disable no-plusplus */
import { isNumber } from 'util';
import * as service from '@/services/systemsmanagement';

export default {
  namespace: 'systemsmanagement',
  state: {
    managedNumber: '', // 已管理设备的数目
    connected: '', // 已连接设备的数目
    disconnected: '', // 未连接设备的数目
    activeJob: '', // 活动工作
    succeeed: '', // 成功的数目
    failed: '', // 失败的数目
    discoveredsystems: 0, // 未管理设备的数目
    pendingSystems: 0, // 等待中设备的数目
    activeAlarms: '', // 活动闹钟
    alarmRules: '', // 闹钟规则
    assets: '', // 标准资产
    approaching: '', // 接近标准的数目
    past: '', // 超过标准的数目
  },

  effects: {
    *getManagedNumber(_, { put, call }) {
      const response = yield call(service.managedSystems);
      if (response.result) {
        const total = response.result.length;
        let connectedNum = 0;
        let disconnectedNum = 0;
        yield put({ type: 'updateManagedNumber', payload: { managedNumber: total } });

        response.result.forEach(element => {
          if (element.connected.state === 1 || element.connected.state === 2) {
            // eslint-disable-next-line no-plusplus
            connectedNum++;
          } else {
            // eslint-disable-next-line no-plusplus
            disconnectedNum++;
          }
        });

        yield put({ type: 'updateConnected', payload: { connected: connectedNum } });
        yield put({ type: 'updateDisconnected', payload: { disconnected: disconnectedNum } });
      }
    },
    *getActiveJob(_, { put, call }) {
      const response = yield call(service.activeJobs);
      if (response.result) {
        let succeeed = 0;
        let failed = 0;
        response.result.forEach(ele => {
          if (ele.state === 0) succeeed++;
          if (ele.state === -1) failed++;
        });
        yield put({ type: 'updateSucceeed', payload: { succeeed } });
        yield put({ type: 'updateFailed', payload: { failed } });
        // yield put({ type: 'updateActiveJob', payload: { activeJob: total }})
      }
    },
    *getDiscoveredsystems(_, { put, call }) {
      // 有问题,待解决
      const response = yield call(service.discoveredSystems);
      yield put({ type: 'updateDiscoveredsystems', payload: { discoveredsystems: response } });
    },
    *getPendingSystems(_, { put, call }) {
      // 有问题，待解决
      const response = yield call(service.pendingSystems);
      yield put({ type: 'updatePendingSystems', payload: { pendingSystems: response } });
    },
    *getActiveAlarms(_, { put, call }) {
      const response = yield call(service.activeAlarms);
      if (isNumber(response.totalCount)) {
        const total = response.totalCount;
        yield put({ type: 'updateActiveAlarms', payload: { activeAlarms: total } });
      }
    },
    *getAlarmRules(_, { put, call }) {
      const response = yield call(service.alarmRules);
      if (response.totalCount) {
        const total = response.totalCount;
        yield put({ type: 'updateAlarmRules', payload: { alarmRules: total } });
      }
    },
    *getAssets(_, { put, call }) {
      const response = yield call(service.calibratedAssets);

      if (response) {
        // eslint-disable-next-line prefer-destructuring
        const total = response.total;
        yield put({ type: 'updateAssets', payload: { assets: total } });

        const approaching = response.approachingRecommendedDueDate;
        yield put({ type: 'updateApproaching', payload: { approaching } });

        const past = response.pastRecommendedDueDate;
        yield put({ type: 'updatePast', payload: { past } });
      }
    },
  },

  reducers: {
    updateManagedNumber(state, { payload }) {
      return { ...state, managedNumber: payload.managedNumber };
    },
    updateConnected(state, { payload }) {
      return { ...state, connected: payload.connected };
    },
    updateDisconnected(state, { payload }) {
      return { ...state, disconnected: payload.disconnected };
    },
    updateActiveJob(state, { payload }) {
      return { ...state, activeJob: payload.activeJob };
    },
    updateSucceeed(state, { payload }) {
      return { ...state, succeeed: payload.succeeed };
    },
    updateFailed(state, { payload }) {
      return { ...state, failed: payload.failed };
    },
    updateDiscoveredsystems(state, { payload }) {
      return { ...state, discoveredsystems: payload.discoveredsystems };
    },
    updatePendingSystems(state, { payload }) {
      return { ...state, pendingSystems: payload.pendingSystems };
    },
    updateActiveAlarms(state, { payload }) {
      return { ...state, activeAlarms: payload.activeAlarms };
    },
    updateAlarmRules(state, { payload }) {
      return { ...state, alarmRules: payload.alarmRules };
    },
    updateAssets(state, { payload }) {
      return { ...state, assets: payload.assets };
    },
    updateApproaching(state, { payload }) {
      return { ...state, approaching: payload.approaching };
    },
    updatePast(state, { payload }) {
      return { ...state, past: payload.past };
    },
  },

  subscriptions: {},
};
