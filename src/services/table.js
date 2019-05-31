import request from '@/utils/requestWithCookie';

export default async function getDeviceTable() {
  return request('GET /api/api/devices/paths');
}
