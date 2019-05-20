import request from '@/utils/requestWithCookie';

export async function getDevices() {
  return request('GET /api/api/devices', {});
}

export async function getDevicesById(payload) {
  const { id, size = 1 } = payload;
  return request(`GET /api/api/devices/${id}?size=${size}`);
}

export async function getDevicesCollection() {
  return request('GET /api/api/devices/collection');
}
