import { createRouter, createWebHistory } from 'vue-router';
import Tickets from '../views/Tickets.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'tickets',
      component: Tickets
    }
  ]
});

export default router;
