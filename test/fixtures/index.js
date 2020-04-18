const fixtures = {
  user: {
    nome: 'Cristiano',
    email: 'crizu@hoy.com',
    senha: 'senha123',
    telefones: [
      {
        numero: '123456789',
        ddd: '11',
      },
    ],
  },

  expiredUser: {
    nome: 'cris',
    email: 'crizu@hoyy.com',
    senha: 'senha123',
    telefones: [
      {
        numero: '123456789',
        ddd: '11',
      },
    ],
  },
};

export default fixtures;
