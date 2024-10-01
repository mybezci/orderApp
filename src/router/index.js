import { createRouter, createWebHistory } from '@ionic/vue-router';
import Tabs from '../views/Tabs.vue'

const routes = [
  {
    path: '/',
    redirect: '/tabs/orders'
  },
  {
    path: '/tabs/',
    component: Tabs,
    children: [
      {
        path: 'orders',
        component: () => import('@/views/ActiveOrders.vue')
      },
      {
        path: 'done',
        component: () => import('@/views/DoneOrders.vue')
      },
      {
        path: 'history',
        component: () => import('@/views/History.vue')
      },
      {
        path: 'settings',
        component: () => import('@/views/Settings.vue')
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
