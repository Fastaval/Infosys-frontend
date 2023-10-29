import { MessageDetails, TicketDetails } from '../models/tickets.model';
import { get, post } from './api.service';

// Tickets
export const fetchTickets = async () => await get('/tickets/ajax');
export const createTicket = async (ticketDetails: Partial<TicketDetails>) => await post('/tickets/ajax', ticketDetails);
export const updateTicket = async (ticketDetails: TicketDetails) => await post('/tickets/ajax', ticketDetails);

// Singular Ticket
export const getTicket = async (ticketId: string) => await get(`/tickets/ajax?id=${ticketId}`);

// Ticket Messages
export const fetchTicketMessages = async (ticketId: string) => await get(`/tickets/${ticketId}/messages`);
export const createTicketMessages = async (messageDetails: Partial<MessageDetails>) =>
  await post(`/tickets/${messageDetails.ticket}/messages`);
export const updateTicketMessages = async (messageDetails: MessageDetails) =>
  await post(`/tickets/${messageDetails.ticket}/messages`);
