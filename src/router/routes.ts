import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { 
        path: '',
        name: 'index',
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
