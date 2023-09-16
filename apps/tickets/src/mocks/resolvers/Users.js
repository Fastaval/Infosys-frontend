export const mockGetUsers = (req, res, ctx) => {
  return res(ctx.json({ status: 'success', code: 200, users: mockedUsers }));
};

const mockedUsers = {
  1: {
    id: 1,
    email: 'peter.e.lind@gmail.com',
    name: 'peter.e.lind@gmail.com',
    description: 'Peter Lind'
  },
  52: {
    id: 52,
    email: 'ak47@762.dk',
    name: 'ak47@762.dk',
    description: 'Alea formand'
  },
  61: {
    id: 61,
    email: 'andreasskovse@gmail.com',
    name: 'andreasskovse@gmail.com',
    description: 'Alea kasserer'
  },
  156: {
    id: 156,
    email: 'karenbech@icloud.com',
    name: 'karenbech@icloud.com',
    description: 'General 2023'
  },
  157: {
    id: 157,
    email: 'Nynnebrandt0125@gmail.com',
    name: 'Nynnebrandt0125@gmail.com',
    description: 'Heltestyrken'
  },
  162: {
    id: 162,
    email: 'westh_mikkel@hotmail.com',
    name: 'westh_mikkel@hotmail.com',
    description: 'Mikkel der laver infosys og tilmelding'
  },
  206: {
    id: 206,
    email: 'olesofasorensen@gmail.com',
    name: 'olesofasorensen@gmail.com',
    description: 'Bunker 2022'
  },
  217: {
    id: 217,
    email: 'hex_henrik@hotmail.com',
    name: 'hex_henrik@hotmail.com',
    description: 'Bunker 2022'
  },
  226: {
    id: 226,
    email: 'jonasjpg@hotmail.com',
    name: 'jonasjpg@hotmail.com',
    description: 'Jonas Glad (APP)'
  },
  241: {
    id: 241,
    email: 'mads@heimdal-thy.dk',
    name: 'mads@heimdal-thy.dk',
    description: 'Mads der hjælper med infosys'
  },
  242: {
    id: 242,
    email: 'marie.oscilowski@gmail.com',
    name: 'marie.oscilowski@gmail.com',
    description: 'Marie hovedarrangør'
  },
  243: {
    id: 243,
    email: 'paulsinding@gmail.com',
    name: 'paulsinding@gmail.com',
    description: 'Paul hovedarrangør'
  },
  244: {
    id: 244,
    email: 'nilank@gmail.com',
    name: 'nilank@gmail.com',
    description: 'Grafik og wear ansvarlig'
  },
  245: {
    id: 245,
    email: 'm.hugobonde@gmail.com',
    name: 'm.hugobonde@gmail.com',
    description: 'Infoboss Hugo'
  },
  246: {
    id: 246,
    email: 'Miniklundolsen@gmail.com',
    name: 'Miniklundolsen@gmail.com',
    description: 'Infoboss Minik'
  }
};
