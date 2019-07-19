import request from '@/utils/requestWithCookie';

// 登陆
export async function login(query) {
  return request(
    'POST /api/api/user/login',
    {
      body: query,
      asJSON: false,
    },
    false
  );
}

export async function logout() {
  return request('GET /api/api/user/logout', {}, false);
}
