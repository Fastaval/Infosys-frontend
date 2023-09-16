import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '', redirect: '/tickets' },
    { path: '/tickets', component: () => import('./views/Tickets.vue'), name: 'Tickets' },
    { path: '/tickets/show/:id', component: () => import('./views/Ticket.vue'), name: 'Ticket' }
  ]
});

export default router;
