import { http } from 'msw';
import { setupWorker } from 'msw/browser';
import { mockGetTicketMessages, mockPostTicketMessages } from './resolvers/Messages';
import { mockGetTickets, mockPostTickets } from './resolvers/Tickets';
import { mockGetTranslations } from './resolvers/Translations';
import { mockGetUsers } from './resolvers/Users';

export const worker = setupWorker(
  http.get('/tickets/ajax', mockGetTickets),
  http.get('/tickets/:id/messages', mockGetTicketMessages),
  http.post('/tickets/:id/messages', mockPostTicketMessages),
  http.post('/tickets/ajax', mockPostTickets),
  http.get('/admin/ajax/users/*', mockGetUsers),
  http.get('/translations/ajax/tickets.*', mockGetTranslations)
);
