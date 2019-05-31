/* eslint-disable no-useless-return */
// 将数据转成图表格式

function getDeviceName(path) {
  return path.split('.')[1];
}

/**
 *
 *
 * @export
 * @param {Array} data 需要转换的数据
 * @returns
 */
export function transformDataToEchartsA(data) {
  const newData = [[], [], []];
  const deviceName = [];
  if (!data || data.length === 0) return [];
  data.forEach(value => {
    if (!value || !value.timestamp || !value.timestamp.timestamp) return;
    const temp = {
      name: new Date(value.timestamp.timestamp).getTime(),
      value: [
        new Date(value.timestamp.timestamp).getTime(),
        Number(Number(value.value).toFixed(2)),
      ],
    };
    if (value.path.includes('Power waste')) {
      deviceName[0] = getDeviceName(value.path);
      if (newData[0].length === 0) newData[0].unshift(temp);
      if (new Date(value.timestamp.timestamp).getTime() !== newData[0][0].name) {
        newData[0].unshift(temp);
      }
      if (newData[0].length > 15) newData[0].pop();
    }
    if (value.path.includes('Voltage')) {
      deviceName[1] = getDeviceName(value.path);

      if (newData[1].length === 0) newData[1].unshift(temp);
      if (new Date(value.timestamp.timestamp).getTime() !== newData[1][0].name) {
        newData[1].unshift(temp);
      }
      if (newData[1].length > 15) newData[1].pop();
    }
    if (value.path.includes('Current')) {
      deviceName[2] = getDeviceName(value.path);
      if (newData[2].length === 0) newData[2].unshift(temp);
      if (new Date(value.timestamp.timestamp).getTime() !== newData[2][0].name) {
        newData[2].unshift(temp);
      }
      if (newData[2].length > 15) newData[2].pop();
    }
  });
  return {
    newData,
    deviceName,
  };
}

export function transformDataToEchartsB(data) {
  const newData = [[], [], [], []];
  const deviceName = [];
  if (!data || data.length === 0) return [];
  data.forEach(value => {
    if (!value || !value.timestamp || !value.timestamp.timestamp) return;
    const temp = {
      name: new Date(value.timestamp.timestamp).getTime(),
      value: [new Date(value.timestamp.timestamp).getTime(), Number(Number(value.value))],
    };
    if (value.path.includes('Infrared')) {
      deviceName[0] = getDeviceName(value.path);
      if (newData[0].length === 0) newData[0].unshift(temp);
      if (new Date(value.timestamp.timestamp).getTime() !== newData[0][0].name) {
        newData[0].unshift(temp);
      }
      if (newData[0].length > 15) newData[0].pop();
    }
    if (value.path.includes('humidity')) {
      deviceName[1] = getDeviceName(value.path);
      if (newData[1].length === 0) newData[1].unshift(temp);
      if (new Date(value.timestamp.timestamp).getTime() !== newData[1][0].name) {
        newData[1].unshift(temp);
      }
      if (newData[1].length > 15) newData[1].pop();
    }
    if (value.path.includes('photosensitive')) {
      deviceName[2] = getDeviceName(value.path);
      if (newData[2].length === 0) newData[2].unshift(temp);
      if (new Date(value.timestamp.timestamp).getTime() !== newData[2][0].name) {
        newData[2].unshift(temp);
      }
      if (newData[2].length > 15) newData[2].pop();
    }
    if (value.path.includes('temperature')) {
      deviceName[3] = getDeviceName(value.path);
      if (newData[3].length === 0) newData[3].unshift(temp);
      if (new Date(value.timestamp.timestamp).getTime() !== newData[3][0].name) {
        newData[3].unshift(temp);
      }
      if (newData[3].length > 15) newData[3].pop();
    }
  });
  return {
    newData,
    deviceName,
  };
}

export function transformDataToEchartsC(data) {
  const newData = [[], [], [], [], [], [], []];
  const deviceName = [];
  if (!data || data.length === 0) return [];
  data.forEach(value => {
    if (!value || !value.timestamp || !value.timestamp.timestamp) return;
    const temp = {
      name: new Date(value.timestamp.timestamp).getTime(),
      value: [new Date(value.timestamp.timestamp).getTime(), Number(Number(value.value))],
    };
    if (value.path.includes('humidity')) {
      deviceName[0] = getDeviceName(value.path);
      if (newData[0].length === 0) newData[0].unshift(temp);
      if (new Date(value.timestamp.timestamp).getTime() !== newData[0][0].name) {
        newData[0].unshift(temp);
      }
      if (newData[0].length > 15) newData[0].pop();
    }
    if (value.path.includes('MTBA')) {
      deviceName[1] = getDeviceName(value.path);
      if (newData[1].length === 0) newData[1].unshift(temp);
      if (new Date(value.timestamp.timestamp).getTime() !== newData[1][0].name) {
        newData[1].unshift(temp);
      }
      if (newData[1].length > 15) newData[1].pop();
    }
    if (value.path.includes('MTBF')) {
      deviceName[2] = getDeviceName(value.path);
      if (newData[2].length === 0) newData[2].unshift(temp);
      if (new Date(value.timestamp.timestamp).getTime() !== newData[2][0].name) {
        newData[2].unshift(temp);
      }
      if (newData[2].length > 15) newData[2].pop();
    }
    if (value.path.includes('OEE')) {
      deviceName[3] = getDeviceName(value.path);
      if (newData[3].length === 0) newData[3].unshift(temp);
      if (new Date(value.timestamp.timestamp).getTime() !== newData[3][0].name) {
        newData[3].unshift(temp);
      }
      if (newData[3].length > 15) newData[3].pop();
    }
    if (value.path.includes('temperature')) {
      deviceName[4] = getDeviceName(value.path);
      if (newData[4].length === 0) newData[4].unshift(temp);
      if (new Date(value.timestamp.timestamp).getTime() !== newData[4][0].name) {
        newData[4].unshift(temp);
      }
      if (newData[4].length > 15) newData[4].pop();
    }
    if (value.path.includes('Top3fail')) {
      deviceName[5] = getDeviceName(value.path);
      if (newData[5].length === 0) newData[5].unshift(temp);
      if (new Date(value.timestamp.timestamp).getTime() !== newData[5][0].name) {
        newData[5].unshift(temp);
      }
      if (newData[5].length > 15) newData[4].pop();
    }
    if (value.path.includes('Yield')) {
      deviceName[6] = getDeviceName(value.path);
      if (newData[6].length === 0) newData[6].unshift(temp);
      if (new Date(value.timestamp.timestamp).getTime() !== newData[6][0].name) {
        newData[6].unshift(temp);
      }
      if (newData[6].length > 15) newData[6].pop();
    }
  });
  return {
    newData,
    deviceName,
  };
}
