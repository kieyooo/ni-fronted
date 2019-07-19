/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
import fetch from 'dva/fetch';
import qs from 'qs';
import notificate from './notification';

const defaultOptions = { credentials: 'include' };

/**
 *
 *
 * @param {string} methodUrl "GET /api/XXX/XXX"
 * @param {{headers?: {[name: string]: string}; body?: any; asJSON?: boolean;}} [options={}]
 */
function createHttpFetch(methodUrl, options = {}) {
  const [method, url] = methodUrl.split(/\s+/);
  const opts = { ...defaultOptions, ...options, method };
  if (method !== 'GET') {
    if (!(opts.body instanceof FormData)) {
      opts.headers = {
        Accept: 'application/json',
        'Content-Type': opts.asJSON
          ? 'application/json; charset=utf-8'
          : 'application/x-www-form-urlencoded; charset=utf-8',
        ...opts.headers,
      };
      opts.body = opts.asJSON ? JSON.stringify(opts.body) : qs.stringify(opts.body);
    } else {
      opts.headers = {
        Accept: 'application/json',
        ...opts.headers,
      };
    }
  }
  return fetch(url, opts);
}

function waitingForDispatch() {
  return new Promise(resolve => {
    let timeout = 5;
    const asker = setInterval(() => {
      const app = window.g_app;
      if (app && app._store && app._store.dispatch) {
        clearInterval(asker);

        return resolve(app._store.dispatch);
      }
      timeout -= 1;
      if (timeout < 0) {
        notificate('error', '', '!!! 超时后仍未获得: window.g_app._store.dispatch 函数');
        clearInterval(asker);
        return resolve(null);
      }
    }, 50);
  });
}

let lastLogoutNotify = 0;
function passiveLogout() {
  const now = Date.now();
  if (now > lastLogoutNotify + 1500) {
    lastLogoutNotify = now;
    notificate(
      'warning',
      '请重新登录',
      '由于你的会话已经过期或用户名密码出错, 请重新登录!',
      'bottomRight'
    );
  }
  waitingForDispatch().then(dispatch => {
    if (dispatch) dispatch({ type: 'login/logout' });
  });
}

/**
 *
 *
 * @export
 * @param {*} actionUrl
 * @param {*} [options={}]
 * @returns
 */
export default async function request(actionUrl, options = {}, isReturnJSON = true) {
  const promiseNull = Promise.resolve(null);
  let status = 0;
  if (isReturnJSON) {
    return createHttpFetch(actionUrl, options)
      .then(response => {
        // eslint-disable-next-line prefer-destructuring
        status = response.status;
        if (status >= 300) {
          passiveLogout();
          return promiseNull;
        }
        return response.json().catch(ex => {
          // eslint-disable-next-line no-console
          console.error(ex);
          notificate('warning', 'JSON异常', `${actionUrl} 返回的不是有效JSON数据`, 'bottomRight');
        });
      })
      .then(response => response);
  }
  return createHttpFetch(actionUrl, options).then(response => {
    if (response.status >= 300) {
      passiveLogout();
      return promiseNull;
    }
    return response;
  });
}
