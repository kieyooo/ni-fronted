export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', name: 'login', component: './User/Login' },
      {
        component: '404',
      },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      { path: '/', redirect: '/systemBoard', authority: ['admin', 'user'] },
      //  系统总览
      {
        path: '/systemBoard',
        name: 'systemBoard',
        icon: 'dashboard',
        component: './SystemBoard/workshop_one',
      },
      {
        path: '/device/:type/:id',
        name: 'systemSetting',
        hideInMenu: true,
        component: './SystemBoard/workshop_two',
      },
      //生产信息管理
      {
        path: '/productionInfoManagement',
        name: 'productionInfoMan',
        icon: 'pie-chart',
        routes: [
          {
            path: '/productionInfoManagement/basicProInfo',
            name: 'basicProInfo',
            component: './ProductionInfoMan/basicProInfo',
          },
        ],
      },
      //报警信息管理
      {
        path: '/alarmInfomanagement',
        name: 'alarmInfomanagement',
        icon: 'warning',
        component: './AlarmInfoman',
      },
      //历史曲线记录
      {
        path: '/historicalCurve',
        name: 'historicalCurve',
        icon: 'line-chart',
        component: './HistoricalCurveRecord',
      },
      //能耗信息管理
      {
        path: '/energyInfoManagement',
        name: 'energyInfoManagement',
        icon: 'sync',
        component: './EnergyInfoMan',
      },
      //设备信息管理
      {
        path: '/deviceInfoManagement',
        name: 'deviceInfoManagement',
        icon: 'desktop',
        component: './deviceInfoMan',
      },
      //项目信息管理
      {
        path: '/projectInfoManagement',
        name: 'projectInfoManagement',
        icon: 'table',
        component: './ProjectInfoMan',
      },
      //我的账号
      {
        path: '/myAccount',
        name: 'myaccount',
        icon: 'user',
        component: './MyAccount',
      },
      //系统管理员
      {
        path: '/systemAdministrator',
        name: 'systemAdministrator',
        icon: 'edit',
        routes: [
          {
            path: '/systemAdministrator/userManagement',
            name: 'userManagement',
            component: './SystemAdministrator/userManagement',
          },
        ],
      },
      //我的消息
      {
        path: '/myMessage',
        name: 'mymessage',
        icon: 'mail',
        component: './MyMessage',
        showMessage: true,
      },
      {
        component: '404',
      },
    ],
  },
];
