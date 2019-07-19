// 设备类型定义

export const DEVICE_A = {
  // A类设备
  'Power waste': {
    name: 'Power waste',
    ChinesName: '', // 中文别名
    show: true, // true 显示图表 false 不显示图表
    Line: true, // 折线图
    Pie: false, // 饼图
    Gauge: true, // 仪表盘
    data: [], // 数据源  [[timestamp, value],[]]  data[0]是最新的数据
  },
  Voltage: {
    name: 'Voltage',
    ChinesName: '电压',
    show: true,
    Line: true,
    Pie: false,
    Gauge: true,
    data: [],
  },
  Current: {
    name: 'Current',
    ChinesName: '电流',
    show: true,
    Line: true,
    Pie: false,
    Gauge: true,
    data: [],
  },
  Datatime: {
    name: 'Datatime',
    ChinesName: '时间',
    show: false,
    Line: true,
    Pie: false,
    Gauge: true,
    data: [],
  },
};
export const DEVICE_B = {
  // B类设备
  Infrared: {
    name: 'Infrared',
    ChinesName: '',
    show: true,
    Line: true,
    Pie: false,
    Gauge: false,
    data: [],
  },
  humidity: {
    name: 'humidity',
    ChinesName: '',
    show: true,
    Line: true,
    Pie: false,
    Gauge: false,
    data: [],
  },
  photosensitive: {
    ChinesName: '',
    name: 'photosensitive',
    show: true,
    Line: true,
    Pie: false,
    Gauge: false,
    data: [],
  },
  temperature: {
    name: 'temperature',
    ChinesName: '',
    show: true,
    Line: true,
    Pie: false,
    Gauge: false,
    data: [],
  },
};
export const DEVICE_C = {
  // C类设备
  humidity: {
    name: 'humidity',
    ChinesName: '',
    show: true,
    Line: true,
    Pie: false,
    Gauge: false,
    data: [],
  },
  MTBA: {
    name: 'MTBA',
    ChinesName: '',
    show: true,
    Line: true,
    Pie: false,
    Gauge: false,
    data: [],
  },
  MTBF: {
    name: 'MTBF',
    ChinesName: '',
    show: true,
    Line: true,
    Pie: false,
    Gauge: false,
    data: [],
  },
  OEE: {
    name: 'OEE',
    ChinesName: '',
    show: true,
    Line: true,
    Pie: false,
    Gauge: false,
    data: [],
  },
  Status: {
    name: 'Status',
    ChinesName: '',
    show: false,
    Line: true,
    Pie: false,
    Gauge: false,
    data: [],
  },
  temperature: {
    name: 'temperature',
    ChinesName: '',
    show: true,
    Line: true,
    Pie: false,
    Gauge: false,
    data: [],
  },
  Top3fail: {
    name: 'Top3fail',
    ChinesName: '',
    show: true,
    Line: false,
    Pie: true,
    Gauge: false,
    data: [],
  },
  Yield: {
    name: 'Yield',
    ChinesName: '',
    show: true,
    Line: true,
    Pie: false,
    Gauge: false,
    data: [],
  },
};
