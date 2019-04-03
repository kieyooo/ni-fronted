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
        path: '/device/:id',
      },
      //生产信息管理
      {
        path: '/productionInfoMan',
        name: 'productionInfoMan',
        icon: 'pie-chart',
        routes: [
          {
            path: '/productionInfoMan/basicProInfo',
            name: 'basicProInfo',
            component: './ProductionInfoMan/basicProInfo',
          },
        ],
      },
      //设备信息管理
      {
        path: '/deviceInfoMan',
        name: 'deviceInfoMan',
        icon: 'desktop',
        component: './deviceInfoMan',
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

      {
        component: '404',
      },
    ],
  },
];
