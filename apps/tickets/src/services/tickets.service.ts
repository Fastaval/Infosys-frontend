import { MessageDetails, TicketDetails } from '../models/tickets.model';
import { get, post } from './api.service';

export const ticketsService = {
  // Tickets
  fetchTickets: async () => await get('/tickets/ajax'),
  createTicket: async (ticketDetails: Partial<TicketDetails>) => await post('/tickets/ajax', ticketDetails),
  updateTicket: async (ticketDetails: TicketDetails) => await post('/tickets/ajax', ticketDetails),

  // Singular Ticket
  getTicket: async (ticketId: string) => await get(`/tickets/ajax?id=${ticketId}`),

  // Ticket Messages
  fetchTicketMessages: async (ticketId: string) => await get(`/tickets/${ticketId}/messages`),
  createTicketMessage: async (messageDetails: Partial<MessageDetails>) =>
    await post(`/tickets/${messageDetails.ticket}/messages`, messageDetails),
  updateTicketMessage: async (messageDetails: Partial<MessageDetails>) =>
    await post(`/tickets/${messageDetails.ticket}/messages`, messageDetails)
};
