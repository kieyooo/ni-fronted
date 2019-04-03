import request from '@/utils/fetch';

export async function tagData() {
  return request(true, 'GET', '/api/tag/tags-with-values');
}

export async function getTagByPath({ path }) {
  return request(true, 'GET', `/api/tag/prefix-tags/${path}`);
}
