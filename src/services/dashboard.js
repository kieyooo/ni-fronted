import  request  from '@/utils/fetch'



export async function Dashboards() { 
    return request(true, 'GET', '/api/dashboard/dashboards');
}

export async function Templates() {
  return request(true, "GET", '/api/dashboard/templates')
}

/**
 *
 *
 * @export
 * @param {Object} params {"name": "admin"}
 * @returns 
 */
export async function newDashboard(params) {
  return request(true, "POST", '/api/dashboard/dashboards',params)
}