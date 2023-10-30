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
