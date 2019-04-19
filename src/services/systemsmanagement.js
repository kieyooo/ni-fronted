import request from '@/utils/fetch';

// 请求等待中设备的数据
export async function pendingSystems() {
  return request(true, 'GET', '/api/sysmgmt/systems/keys');
}

export async function discoveredSystems() {
  return request(true, 'POST', '/api/sysmgmt/systems/managed/query', {
    filter: {},
    projection: {
      connected: true,
      grains: true,
      id: true,
      last_updated_timestamp: true,
    },
  });
}

// 请求活动工作的数据
export async function activeJobs() {
  return request(true, 'POST', '/api/sysmgmt/systems/managed/jobs/query', {
    filter: {
      $and: [
        {
          fun: {
            $ne: 'saltutil.find_job',
          },
        },
        {
          $or: [
            {
              'conf.kwargs.metadata._hidden': {
                $exists: false,
              },
            },
            {
              'conf.kwargs.metadata._hidden': false,
            },
          ],
        },
      ],
    },
  });
}

// 请求闹钟规则的数据
export async function alarmRules() {
  return request(true, 'POST', '/api/tagrule/query-rules', {
    skip: 0,
    take: 1000,
    tagPath: null,
  });
}

// 请求已管理系统的数据
export async function managedSystems() {
  return request(true, 'POST', '/api/sysmgmt/systems/managed/query', {
    filter: {},
    projection: {
      id: true,
      connected: true,
    },
  });
}

// 请求标准资产的数据
export async function calibratedAssets() {
  return request(true, 'GET', '/api/apm/calibratable-asset-summary');
}

// 请求活动闹钟的数据
export async function activeAlarms() {
  return request(true, 'POST', '/api/alarm/query-instances', {
    active: true,
    skip: 0,
    take: 1000,
  });
}
