import request from '@/utils/fetch';

// 请求全都的tag数据
export async function tagData() {
  return request(true, 'GET', '/api/tag/tags-with-values');
}

// 通过路径来请求tag数据
export async function getTagByPath({ path }) {
  return request(true, 'GET', `/api/tag/prefix-tags/${path}`);
}

// 请求LBH设备的数据 返回一个点的数据
export async function getTagIsLBH() {
  return request(true, 'Get', '/api/tag/lbh-properties');
}

// 请求LBH设备的数据 返回一组的数据
export async function getTagLBH() {
  return request(true, 'GET', '/api/tag/v1/lbh?number=20');
}
