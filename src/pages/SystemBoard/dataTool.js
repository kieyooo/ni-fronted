/* eslint-disable no-useless-return */
// 将数据转成图表格式

import { DEVICE_A, DEVICE_B, DEVICE_C } from '@/common/deviceDefinition';

export function transformDataToEcharts(data, type) {
  let deviceArr = [];
  let deviceData = {};
  switch (type) {
    case 'A':
      deviceArr = Object.keys(DEVICE_A);
      deviceData = DEVICE_A;
      break;
    case 'B':
      deviceArr = Object.keys(DEVICE_B);
      deviceData = DEVICE_B;
      break;
    case 'C':
      deviceArr = Object.keys(DEVICE_C);
      deviceData = DEVICE_C;
      break;
    default:
      break;
  }
  if (!data || data.length === 0) return [];
  data.forEach(value => {
    if (!value || !value.timestamp || !value.timestamp.timestamp) return;
    const temp = {
      name: new Date(value.timestamp.timestamp).getTime(),
      value: [
        new Date(value.timestamp.timestamp).getTime(),
        Number.isNaN(Number(value.value)) ? value.value : Number(Number(value.value).toFixed(4)),
      ],
    };
    deviceArr.forEach(val => {
      if (value.path.includes(val)) {
        const tempTimeStamp = new Date(value.timestamp.timestamp).getTime();
        if (deviceData[val].data.length === 0) deviceData[val].data.unshift(temp);
        if (tempTimeStamp > deviceData[val].data[0].name) {
          deviceData[val].data.unshift(temp);
        }
        if (deviceData[val].data.length > 15) deviceData[val].data.pop();
      }
    });
  });
  return { deviceData };
}

// 重置设备的数据源
export function clearDataList() {
  const A = Object.keys(DEVICE_A);
  const B = Object.keys(DEVICE_B);
  const C = Object.keys(DEVICE_C);
  A.forEach(val => {
    DEVICE_A[val].data = [];
  });
  B.forEach(val => {
    DEVICE_B[val].data = [];
  });
  C.forEach(val => {
    DEVICE_C[val].data = [];
  });
}
