import request from '../utils/fetch'

export default async function logout() {
  return request(false, "GET", '/api/login/logout');
}
