import { HttpResponse } from 'msw';

export const mockGetTicketMessages = (info) => {
  return HttpResponse.json({
    status: 'success',
    messages: mockedTicketMessages.filter((message) => message.ticket == info.params.id)
  });
};

export const mockPostTicketMessages = (info) => {
  if (info.request.body) {
    return HttpResponse.json({ status: 'success', msg: 'body had content' });
  }
  return HttpResponse.json({ status: 'success', msg: 'body had NO content' });
};

const mockedTicketMessages = [
  {
    id: 8,
    last_edit: null,
    message:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. \nLorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    posted: 1694286232,
    ticket: 1,
    user: 157
  },
  {
    id: 9,
    last_edit: 1694286267,
    message: 'Message updated via test interface',
    posted: 1694286263,
    ticket: 1,
    user: 241
  },
  {
    id: 10,
    last_edit: null,
    message:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. \nLorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    posted: 1694286271,
    ticket: 1,
    user: 241
  },
  {
    id: 11,
    last_edit: null,
    message:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    posted: 1694286288,
    ticket: 1,
    user: 157
  },
  {
    id: 12,
    last_edit: null,
    message:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    posted: 1694286300,
    ticket: 1,
    user: 157
  }
];
