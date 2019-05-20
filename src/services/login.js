import request from '@/utils/requestWithCookie';

// 登陆
export default async function login(query) {
  return request(
    'POST /api/api/user/login',
    {
      body: query,
      asJSON: false,
    },
    false
  );
}
