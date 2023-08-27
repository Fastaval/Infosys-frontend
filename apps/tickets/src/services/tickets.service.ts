import { get, post } from './api.service';

export interface TicketResponse {
  status: 'success' | 'error';
  tickets: TicketDetails[];
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

export const getTickets = async () => (await get('ajax')).json() as Promise<TicketResponse>;

export const getTicket = async (ticketId) => (await get(`ajax?id=${ticketId}`)).json() as Promise<TicketResponse>;

export const createTicket = async () => await post('ajax');

export const updateTicket = async (ticketDetails: TicketDetails) => await post('ajax', ticketDetails);
