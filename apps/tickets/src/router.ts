import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: () => import('./views/Tickets.vue'), name: 'Tickets' },
    { path: '/:id', component: () => import('./views/Ticket.vue'), name: 'Ticket' }
  ]
});

export default router;
