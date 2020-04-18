import 'dotenv/config';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../src';
import { connectToDb, clearDb } from '../src/database';
import fixtures from './fixtures';

chai.use(chaiHttp);
let persistedUser;

describe('Test Routes', () => {
  before(async () => {
    await connectToDb({ databaseUrl: process.env.TEST_DATABASE });
  });

  after(async () => {
    await clearDb();
    console.log('Db clear');
  });

  describe('Test, /sing-up route', () => {
    const { user } = fixtures;
    it('return success', (done) => {
      chai.request(app).post('/sing-up')
        .send(user)
        .end((err, res) => {
          expect(res.body.nome).to.be.equal('Cristiano');
          expect(res.body.email).to.be.equal('crizu@hoy.com');
          done();
        });
    });

    it('return error "E-mail ja existente."', (done) => {
      chai.request(app).post('/sing-up')
        .send(user)
        .end((err, res) => {
          expect(res.body.message).to.be.equal('E-mail ja existente.');
          done();
        });
    });
  });

  describe('Test, /sing-in route', () => {
    const { email, senha } = fixtures.user;
    it('return success', (done) => {
      chai.request(app).post('/sing-in')
        .send({ email, senha })
        .end((err, res) => {
          persistedUser = res.body;
          expect(res.body.nome).to.be.equal('Cristiano');
          expect(res.body.email).to.be.equal('crizu@hoy.com');
          done();
        });
    });

    it('return "Usuário e/ou senha inválidos" when not find the email ', (done) => {
      chai.request(app).post('/sing-in')
        .send({ email: 'email', senha: 'senha' })
        .end((err, res) => {
          expect(res.body.message).to.be.equal('Usuário e/ou senha inválidos.');
          done();
        });
    });

    it('return "Usuário e/ou senha inválidos" when pass are not the same', (done) => {
      chai.request(app).post('/sing-in')
        .send({ email, senha: 'senha' })
        .end((err, res) => {
          expect(res.body.message).to.be.equal('Usuário e/ou senha inválidos.');
          done();
        });
    });
  });

  describe('Test /user route', () => {
    const { expiredUser } = fixtures;
    it('return "Nao autorizado" when not have token', (done) => {
      const { _id } = persistedUser;
      chai.request(app).get(`/user/${_id}`)
        .end((err, res) => {
          expect(res.body.message).to.be.equal('Não autorizado.');
          done();
        });
    });

    it('return "Nao autorizado" when token are not the same', (done) => {
      const { _id } = persistedUser;
      chai.request(app).get(`/user/${_id}`)
        .set('authorization', { token: 'aaa' })
        .end((err, res) => {
          expect(res.body.message).to.be.equal('Não autorizado.');
          done();
        });
    });

    it('return success', (done) => {
      const { _id, token } = persistedUser;
      chai.request(app).get(`/user/${_id}`)
        .set('authorization', token)
        .end((err, res) => {
          expect(res.body.nome).to.be.equal('Cristiano');
          expect(res.body.email).to.be.equal('crizu@hoy.com');
          done();
        });
    });

    it('save user with expired token', (done) => {
      expiredUser.expiredToken = jwt.sign(expiredUser, process.env.SECRET, { expiresIn: '30 ms' });
      chai.request(app).post('/sing-up')
        .send(expiredUser)
        .end((err, res) => {
          persistedUser = res.body;
          expect(res.body.nome).to.be.equal('cris');
          expect(res.body.email).to.be.equal('crizu@hoyy.com');
          done();
        });
    });

    it('invalid session', (done) => {
      const { _id, token } = persistedUser;
      chai.request(app).get(`/user/${_id}`)
        .set('authorization', token)
        .end((err, res) => {
          expect(res.body.message).to.be.equal('Sessão inválida');
          done();
        });
    });
  });
});
