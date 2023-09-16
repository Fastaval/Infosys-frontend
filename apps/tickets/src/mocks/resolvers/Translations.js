export const mockGetTranslations = (req, res, ctx) => {
  return res(ctx.json({ status: 'success', translations: mockedTranslations }));
};

const mockedTranslations = {
  tickets: {
    category: [{ da: 'Andet' }, { da: 'Infosys' }, { da: 'Proces' }, { da: 'Arrangør' }, { da: 'Betaling' }],
    open: { da: 'Åben' },
    closed: { da: 'Lukket' },
    status: {
      open: [{ da: 'Oprettet' }, { da: 'Startet' }, { da: 'Skal testes' }, { da: 'Venter' }],
      closed: [{ da: 'Annulleret' }, { da: 'Godkendt' }, { da: 'Kan/vil ikke lave' }]
    },
    priority: [{ da: 'Meget lav' }, { da: 'Lav' }, { da: 'Mellem' }, { da: 'Høj' }]
  }
};
