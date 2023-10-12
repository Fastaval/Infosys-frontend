export const mockGetTickets = (req, res, ctx) => {
  const ticketId = req.url.searchParams.get('id');

  return res(
    ctx.json({ status: 'success', tickets: ticketId ? { [ticketId]: mockedTickets[ticketId] } : mockedTickets })
  );
};

export const mockPostTickets = (req, res, ctx) => {
  if (req.body) {
    return res(ctx.json({ status: 'success', msg: 'body had content' }));
  }
  return res(ctx.json({ status: 'success', msg: 'body had NO content' }));
};

const mockedTickets = {
  1: {
    assignee: 162,
    category: 0,
    created: 1692373628,
    creator: 162,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    id: 1,
    last_edit: null,
    name: 'Rettet Opgave',
    open: 1,
    priority: 0,
    status: 0
  },
  2: {
    id: 2,
    name: 'Ticket system til Infosys',
    category: 0,
    priority: 0,
    status: 1,
    open: 1,
    creator: 162,
    assignee: 162,
    description: null,
    created: null,
    last_edit: null
  },
  3: {
    id: 3,
    name: 'Rettet Opgave',
    category: 0,
    priority: 0,
    status: 2,
    open: 1,
    creator: 162,
    assignee: 162,
    description: null,
    created: null,
    last_edit: null
  },
  4: {
    id: 4,
    name: 'Rettet Opgave',
    category: 0,
    priority: 0,
    status: 3,
    open: 1,
    creator: 162,
    assignee: 162,
    description: 'Denne opgave er rette med testknap',
    created: 1692373628,
    last_edit: 1692377966
  },
  5: {
    id: 5,
    name: 'Rettet Opgave',
    category: 0,
    priority: 0,
    status: 0,
    open: 0,
    creator: 162,
    assignee: 162,
    description: 'Denne opgave er rettet med testknap',
    created: 1692378092,
    last_edit: 1692378102
  },
  6: {
    id: 6,
    name: 'Rettet Opgave',
    category: 0,
    priority: 0,
    status: 1,
    open: 0,
    creator: 162,
    assignee: 162,
    description: 'Denne opgave er rettet med testknap',
    created: 1693061901,
    last_edit: 1693061912
  },
  7: {
    id: 7,
    name: 'Test Opgave',
    category: 0,
    priority: 0,
    status: 2,
    open: 0,
    creator: 241,
    assignee: 241,
    description: 'Opgave oprettet via test interface',
    created: 1693073784,
    last_edit: null
  },
  8: {
    id: 8,
    name: 'Test Opgave',
    category: 0,
    priority: 0,
    status: 0,
    open: 1,
    creator: 241,
    assignee: 241,
    description: 'Opgave oprettet via test interface',
    created: 1693074773,
    last_edit: null
  }
};
