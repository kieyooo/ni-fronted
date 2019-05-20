import request from '@/utils/requestWithCookie';
import { stringify } from 'qs';

export async function getChartsTags(payload) {
  return request(`GET /api/api/charts/tags?${stringify(payload)}`);
}

export async function patchChartsTags(payload) {
  return request(`PATCH /api/api/charts/tags?${stringify(payload)}`);
}
