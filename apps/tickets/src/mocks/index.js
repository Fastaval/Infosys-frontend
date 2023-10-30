import { rest, setupWorker } from 'msw';
import { mockGetTicketMessages, mockPostTicketMessages } from './resolvers/Messages';
import { mockGetTickets, mockPostTickets } from './resolvers/Tickets';
import { mockGetTranslations } from './resolvers/Translations';
import { mockGetUsers } from './resolvers/Users';

export const worker = setupWorker(
  rest.get('/tickets/ajax', mockGetTickets),
  rest.get('/tickets/:id/messages', mockGetTicketMessages),
  rest.post('/tickets/:id/messages', mockPostTicketMessages),
  rest.post('/tickets/ajax', mockPostTickets),
  rest.get('/admin/ajax/users/*', mockGetUsers),
  rest.get('/translations/ajax/tickets.*', mockGetTranslations)
);
