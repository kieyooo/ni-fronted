import request from '@/utils/fetch';

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

export async function alarmRules() {
  return request(true, 'POST', '/api/tagrule/query-rules', {
    skip: 0,
    take: 1000,
    tagPath: null,
  });
}

export async function managedSystems() {
  return request(true, 'POST', '/api/sysmgmt/systems/managed/query', {
    filter: {},
    projection: {
      id: true,
      connected: true,
    },
  });
}

export async function calibratedAssets() {
  return request(true, 'GET', '/api/apm/calibratable-asset-summary');
}

export async function activeAlarms() {
  return request(true, 'POST', '/api/alarm/query-instances', {
    active: true,
    skip: 0,
    take: 1000,
  });
}
