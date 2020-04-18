import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  nome: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  senha: {
    type: String,
    required: true,
  },
  telefones: {
    type: [{
      numero: String,
      ddd: String,
    }],
  },
  ultimo_login: {
    type: Date,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
}, {
  timestamps:
    {
      createdAt: 'data_criacao',
      updatedAt: 'data_atualizacao',
    },
});

const SkyUser = model('SkyUser', userSchema);

export default SkyUser;
