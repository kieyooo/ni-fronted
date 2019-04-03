import * as service from '../services/dashboard'

export default {
  namespace: 'dashboard',
  state: {
    dashboards: [],
    templates: []
  },
  effects: {
    *dashboard(_, { put, call }) {
      const res = yield call(service.Dashboards);
      if (res.dashboards) {
        yield put({type:'updateDashboard', payload: {data :res.dashboards}})
      }
    },
    *templates(_, { put, call }) {
      const res = yield call(service.Templates);
      if(res.templates) {
        yield put({type:'updateTemplates', payload: {data: res.templates}})
      }
    },
    *newDashboard({ payload }, { call, put }) {
      const name = payload;
      const newDashboardID =  yield call(service.newDashboard, payload);
      if(newDashboardID) {
        yield put({type:'addNewDashboard', payload:{name,id: newDashboardID}})
      }
    }
  },
  reducers: {
    updateDashboard(state, { payload }) {
      return {
        ...state, dashboards: payload.data
      }
    },
    updateTemplates(state, { payload }) {
      return {
        ...state, templates: payload.data
      }
    },
    addNewDashboard(state, { payload }) {
      const newDashboard = {...payload};
      return {
        ...state.push(newDashboard)
      }
    }
  }
}