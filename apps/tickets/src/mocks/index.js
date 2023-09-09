import { rest, setupWorker } from 'msw';
import { mockGetTicketMessages } from './resolvers/Messages';
import { mockGetTickets, mockPostTickets } from './resolvers/Tickets';

export const worker = setupWorker(
  rest.get('/ajax', mockGetTickets),
  rest.post('/ajax', mockPostTickets),
  rest.get('/:id/messages', mockGetTicketMessages)
);
