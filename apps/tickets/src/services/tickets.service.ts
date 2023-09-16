import { get, post } from './api.service';

export interface TicketResponse {
  status: 'success' | 'error';
  tickets: TicketDetails[];
}

export interface TicketMessagesResponse {
  status: 'success' | 'error';
  messages: MessageDetails[];
}

export interface TicketDetails {
  assignee: number;
  category: number;
  created: number;
  creator: number;
  description: string;
  id: number;
  last_edit: number;
  name: string;
  open: number;
  priority: number;
  status?: number;
}

export interface MessageDetails {
  id: number;
  last_edit: number;
  message: string;
  posted: number;
  ticket: number;
  user: number;
}

export const getTickets = async () => (await get('/tickets/ajax')).json() as Promise<TicketResponse>;

export const createTicket = async () => await post('/tickets/ajax');

export const updateTicket = async (ticketDetails: TicketDetails) => await post('/tickets/ajax', ticketDetails);

export const getTicket = async (ticketId) =>
  (await get(`/tickets/ajax?id=${ticketId}`)).json() as Promise<TicketResponse>;

export const getTicketMessages = async (ticketId) =>
  (await get(`/tickets/${ticketId}/messages`)).json() as Promise<TicketMessagesResponse>;
