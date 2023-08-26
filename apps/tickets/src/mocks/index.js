import { rest, setupWorker } from 'msw';
import { mockTickets } from './resolvers/mockTickets';

export const worker = setupWorker(rest.get('/tickets/ajax', mockTickets));
