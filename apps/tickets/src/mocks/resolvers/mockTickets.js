// src/mocks/resolvers/mockUser.js
export const mockTickets = (req, res, ctx) => {
  return res(
    ctx.json({
      status: 'success',
      tickets: {
        1: {
          id: 1,
          name: 'Test Opgave',
          category: 0,
          priority: 0,
          status: 0,
          open: 1,
          creator: 162,
          assignee: 162,
          description: null,
          created: null,
          last_edit: null
        },
        2: {
          id: 2,
          name: 'Ticket system til Infosys',
          category: 0,
          priority: 0,
          status: 0,
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
          status: 0,
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
          status: 0,
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
          open: 1,
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
          status: 0,
          open: 1,
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
          status: 0,
          open: 1,
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
      }
    })
  );
};
