export const mockGetTicketMessages = (req, res, ctx) => {
  return res(
    ctx.json({
      status: 'success',
      messages: mockedTicketMessages.filter((message) => message.ticket == req.params.id)
    })
  );
};

const mockedTicketMessages = [
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
    message: 'Message posted via test interface',
    posted: 1694286271,
    ticket: 1,
    user: 241
  }
];
