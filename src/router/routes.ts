import { RouteRecordRaw } from 'vue-router';

const redirectroute = (to: any, from: any, next: any) => {
		return next({ name: 'startIndex'});
};

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'start',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { 
        path: '',
        name: 'index',
        beforeEnter: redirectroute,
        component: () => import('pages/IndexPage.vue') 
      },
      { 
        path: '/home',
        name: 'startIndex',
        component: () => import('pages/IndexPage.vue') 
      },
      { 
        path: '/movimientos',
        name: 'movements',
        component: () => import('pages/MovementsCash.vue') 
      },
      { 
        path: '/estadisticas',
        name: 'statistics',
        component: () => import('pages/AppStatistics.vue') 
      },
      { 
        path: '/configuraciones',
        name: 'configs',
        component: () => import('pages/AppSettings.vue') 
      },

    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
