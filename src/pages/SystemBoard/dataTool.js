/* eslint-disable no-useless-return */
// 将数据转成图表格式

import { DEVICE_A, DEVICE_B, DEVICE_C } from '@/common/deviceDefinition';

export function transformDataToEchartsA(data) {
  const deviceArr = Object.keys(DEVICE_A);
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
        if (DEVICE_A[val].data.length === 0) DEVICE_A[val].data.unshift(temp);
        if (tempTimeStamp > DEVICE_A[val].data[0].name) {
          DEVICE_A[val].data.unshift(temp);
        }
        if (DEVICE_A[val].data.length > 15) DEVICE_A[val].data.pop();
      }
    });
  });
  return { DEVICE_A };
}

export function transformDataToEchartsB(data) {
  const deviceArr = Object.keys(DEVICE_B);
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
        if (DEVICE_B[val].data.length === 0) DEVICE_B[val].data.unshift(temp);
        if (tempTimeStamp > DEVICE_B[val].data[0].name) {
          DEVICE_B[val].data.unshift(temp);
        }
        if (DEVICE_B[val].data.length > 15) DEVICE_B[val].data.pop();
      }
    });
  });
  return { DEVICE_B };
}

export function transformDataToEchartsC(data) {
  const deviceArr = Object.keys(DEVICE_C);
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
        if (DEVICE_C[val].data.length === 0) DEVICE_C[val].data.unshift(temp);
        if (tempTimeStamp > DEVICE_C[val].data[0].name) {
          DEVICE_C[val].data.unshift(temp);
        }
        if (DEVICE_C[val].data.length > 15) DEVICE_C[val].data.pop();
      }
    });
  });
  return { DEVICE_C };
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
