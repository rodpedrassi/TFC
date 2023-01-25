import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import User from '../database/models/UserModel';
import UserMock from './mocks/UserMock';
import * as bcrypt from 'bcryptjs';
import { doesNotMatch } from 'assert';
import * as jwt from '../authentication/jwt';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes da rota post /login', () => {
  let chaiHttpResponse: Response;

  afterEach(()=>{
    (User.findOne as sinon.SinonStub).restore();
    sinon.restore()
  })
  
  it('Checa se retorna um token em caso de SUCESSO com status 200', async function () {
    sinon.stub(User, 'findOne').resolves({dataValues: UserMock.user} as User);
    sinon.stub(bcrypt, 'compareSync').returns(true);
    sinon.stub(jwt, 'createToken').returns(UserMock.token);
    
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(UserMock.login);

    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body.token).to.equal(UserMock.token);
  });

  it('Checa se retorna "All fields must be filled" ao enviar uma requisição sem password', async () => {
    sinon.stub(User, 'findOne').resolves(UserMock.user as User)
  
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: UserMock.login.email });
      
    expect(chaiHttpResponse.status).to.equal(400);
    expect(chaiHttpResponse.body.message).to.equal('All fields must be filled');
  });

  it('Checa se retorna "All fields must be filled" ao enviar uma requisição sem email', async () => {
    sinon.stub(User, 'findOne').resolves(UserMock.user as User)
  
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: UserMock.login.email });
      
    expect(chaiHttpResponse.status).to.equal(400);
    expect(chaiHttpResponse.body.message).to.equal('All fields must be filled');
  });

  it('Checa se ao digitar uma senha inválida a mensagem "Incorrect email or password" é enviada', async () => {
    sinon.stub(User, 'findOne').resolves(UserMock.user as User);
    sinon.stub(bcrypt, 'compareSync').returns(false);

    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: UserMock.login.email, password: 'senhaErrada' });

      
    expect(chaiHttpResponse.status).to.equal(401);
    expect(chaiHttpResponse.body.message).to.equal('Incorrect email or password');
  });

  it('Checa se ao digitar um email não cadastrado a mensagem "Incorrect email or password" é enviada', async () => {
    sinon.stub(User, 'findOne').resolves(UserMock.user as User);

    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: 'emailErrado', password: UserMock.login.password });

      
    expect(chaiHttpResponse.status).to.equal(401);
    expect(chaiHttpResponse.body.message).to.equal('Incorrect email or password');
  });
});

describe('Testes da rota get login/validate', () => {
  let chaiHttpResponse: Response;

  afterEach(()=>{
    (User.findOne as sinon.SinonStub).restore();
    sinon.restore()
  })
  it('Checa se retorna a role do usário no caso de SUCESSO', async () => {
    sinon.stub(User, 'findOne').resolves(UserMock.user as User);
  
    chaiHttpResponse = await chai
      .request(app)
      .get('/login/validate')
      .set('Authorization', UserMock.token);
      
    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body.role).to.equal(UserMock.user.role);
  });

  it('Checa se retorna uma menssagem ao pedir uma requisição sem token ', async () => {
    sinon.stub(User, 'findOne').resolves(UserMock.user as User);
  
    chaiHttpResponse = await chai
      .request(app)
      .get('/login/validate')
      .set('Authorization', '');
      
    expect(chaiHttpResponse.status).to.equal(401);
    expect(chaiHttpResponse.body.message).to.equal('Token not found');
  });

  it('Checa se retorna uma menssagem ao pedir uma requisição com token inválido', async () => {
    sinon.stub(User, 'findOne').resolves(UserMock.user as User);
  
    chaiHttpResponse = await chai
      .request(app)
      .get('/login/validate')
      .set('Authorization', 'tokenErrado');
      
    expect(chaiHttpResponse.status).to.equal(401);
    expect(chaiHttpResponse.body.message).to.equal('Token must be a valid token');
  });
});
