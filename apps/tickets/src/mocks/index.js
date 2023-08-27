import { rest, setupWorker } from 'msw';
import { mockGetTickets, mockPostTickets } from './resolvers/Tickets';

export const worker = setupWorker(rest.get('/ajax', mockGetTickets), rest.post('/ajax', mockPostTickets));
