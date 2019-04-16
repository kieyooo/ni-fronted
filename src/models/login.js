import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import * as service from '@/services/login'
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';
import notificate from '@/utils/notification'

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(service.login, payload);
      // Login successfully
      if (response.status === 200) {
        yield put({
          type: 'changeLoginStatus',
          payload: { currentAuthority : 'admin' },
        });
        reloadAuthorized();
        const urlParams = new URL(window.location.href);
        const params = getPageQuery(); 
        let { redirect } = params;
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            redirect = null;
          }
        }
        yield put(routerRedux.replace(redirect || '/'));
      }
      
      if (response.status === 404) notificate("warning","警告","用户名或密码出错！");
      if (response.status >= 500 ) notificate("error",'出错',"网络或服务器出现问题！");
    },
    *logout(_, { put }) {
      // yield call(service.logout);
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
          currentAuthority: 'guest',
        },
      });
      reloadAuthorized();
      // redirect
      if (window.location.pathname !== '/user/login') {
        yield put(
          routerRedux.replace({
            pathname: '/user/login',
            search: stringify({
              redirect: window.location.href,
            }),
          })
        );
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};
