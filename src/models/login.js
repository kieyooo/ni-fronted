import { routerRedux } from 'dva/router';
import * as service from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { reloadAuthorized } from '@/utils/Authorized';
import notificate from '@/utils/notification';

function isLoginOrException(pathname) {
  if (pathname === '/') return true;
  if (pathname === '/user') return true;
  if (pathname.startsWith('/user')) return true;
  return false;
}

function getLastPage() {
  const lastPage = window.localStorage.getItem('LAST_PAGE');
  if (lastPage && !isLoginOrException(lastPage)) {
    window.localStorage.removeItem('LAST_PAGE');
    return lastPage;
  }
  return null;
}

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    // 登陆数据处理
    *login({ payload }, { call, put }) {
      const response = yield call(service.login, payload);
      // Login successfully
      if (response.status === 200) {
        yield put({
          type: 'changeLoginStatus',
          payload: { currentAuthority: 'admin' },
        });
        reloadAuthorized();

        const lastPage = getLastPage();
        yield put(routerRedux.replace(lastPage || '/'));
      }

      if (response.status === 404) notificate('warning', '警告', '用户名或密码出错！');
      if (response.status >= 500) notificate('error', '出错', '网络或服务器出现问题！');
    },

    // 注销处理
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
        yield put(routerRedux.replace('/user/login'));
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

  subscriptions: {
    setup({ history }) {
      history.listen(({ pathname }) => {
        if (isLoginOrException(pathname)) return;
        window.localStorage.setItem('LAST_PAGE', pathname);
      });
    },
  },
};
