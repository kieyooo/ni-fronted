import request from '@/utils/fetch'


export async function login(query) {
  return request(false, 'POST', '/api/login/login.do', query, {
    'Content-Type': 'application/x-www-form-urlencoded',
  });
}

export async function ping() {
  return request(false, "GET", '/api/sysmgmt/ping')
}