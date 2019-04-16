import { isArray } from 'util';


function type(params) {
  if (params === 'DOUBLE') return 'Double';
  if (params === 'INT') return '32-bit Integer';
  return '';
}

function connectdStatus(status) {
  switch (status) {
    case 2:
      return '已连接';
    case 0:
      return '未连接';
    case 1:
      return '已连接';
    case -1:
      return '未连接';
    default:
      return '';
  }
}

export function toFixed(string, number) {
  const tryToNumber = Number(string);
  if (Number.isNaN(tryToNumber)) {
    return string;
  }
  if (number > 0) return parseFloat(tryToNumber.toFixed(number));
  return parseFloat(tryToNumber);
}

export function serializeTableData(data) {
  const newData = [];
  if (!isArray(data)) return [];

  data.forEach(ele => {
    const dataisTure = !!ele.grains;
    const temp = {
      Name: dataisTure ? ele.grains.data.localhost : ele.id,
      IPAddress: dataisTure ? ele.grains.data.ipv4[0] : '',
      MACAddress: dataisTure ? Object.values(ele.grains.data.hwaddr_interfaces)[0] : '',
      MinionID: ele.id || '',
      Vendor: dataisTure ? ele.grains.data.manufacturer : '',
      ModelName: dataisTure ? ele.grains.data.productname : '',
      OperatingSystem: dataisTure ? ele.grains.data.osfinger : '',
      SerialNumber: dataisTure ? ele.grains.data.serialnumber : '',
      Connection: connectdStatus(ele.connected.state),
      Master: dataisTure ? ele.grains.data.master : '',
      SystemStartTime: dataisTure ? new Date(ele.grains.data.boottime).toLocaleString() : '',
      Comments: dataisTure ? ele.grains.data.computer_desc : '',
      PendingStatus: '',
    };
    newData.push(temp);
  });
  return newData;
}

export function serializeBrowserData(sourceData) {
  const data = [];
  if (!isArray(sourceData)) return [];
  sourceData.forEach(ele => {
    const dataisTure = !!ele.grains;
    const temp = {
      Name: dataisTure ? ele.grains.data.localhost : '',
      IPAddress: dataisTure ? ele.grains.data.ipv4 : [],
      MACAddress: dataisTure ? Object.values(ele.grains.data.hwaddr_interfaces) : [],
      MinionID: ele.id || '',
      Vendor: dataisTure ? ele.grains.data.manufacturer : '',
      ModelName: dataisTure ? ele.grains.data.productname : '',
      OperatingSystem: dataisTure ? ele.grains.data.osfinger : '',
      SerialNumber: dataisTure ? ele.grains.data.serialnumber : '',
      Connection: connectdStatus(ele.connected.state),
      Master: dataisTure ? ele.grains.data.master : '',
      SystemStartTime: dataisTure ? new Date(ele.grains.data.boottime).toLocaleString() : '',
      Comments: dataisTure ? ele.grains.data.computer_desc : '',
      Locale: dataisTure ? ele.grains.data.locale_info.defaultlanguage : '',
      FQDN: dataisTure ? ele.grains.data.fqdn : '',
      hwaddr_interfaces: dataisTure ? Object.keys(ele.grains.data.hwaddr_interfaces) : [],
    };
    data.push(temp);
  });
  return data;
}

export function tagData(soureData) {
  const data = [];
  if (!isArray(soureData)) return [];
  soureData.forEach(ele => {
    const aggregatesIsNull = !!ele.aggregates;
    const currentIsNull = !!ele.current;
    const temp = {
      Path: ele.tag.path || '',
      CurrentValue: currentIsNull ? toFixed(ele.current.value.value, 1) : '',
      Min: aggregatesIsNull ? toFixed(ele.aggregates.min, 1) : '',
      Max: aggregatesIsNull ? toFixed(ele.aggregates.max, 1) : '',
      Mean: aggregatesIsNull ? toFixed(ele.aggregates.avg, 6) : '',
      Count: aggregatesIsNull ? toFixed(ele.aggregates.count) : '',
      Updated: currentIsNull ? new Date(ele.current.timestamp).toLocaleString() : '',
      Keywords: ele.tag.keywords || '',
      Type: type(ele.tag.type),
      CollectAggregates: ele.tag.collectAggregates.toString() || '',
    };
    data.push(temp);
  });

  return data;
}

