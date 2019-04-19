import request from '@/utils/fetch';

// 登陆
export async function login(query) {
  return request(false, 'POST', '/api/login/login.do', query, {
    'Content-Type': 'application/x-www-form-urlencoded',
  });
}

// cookie是否失效
export async function ping() {
  return request(false, 'GET', '/api/sysmgmt/ping');
}

// 注销
export async function logout() {
  return request(false, 'GET', '/api/login/logout');
}
