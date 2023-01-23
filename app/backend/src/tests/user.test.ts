import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import User from '../database/models/UserModel';
import UserMock from './mocks/UserMock';
import * as jwt from '../authentication/jwt';
import * as bcrypt from 'bcryptjs';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes da rota post /login', () => {
  let chaiHttpResponse: Response;
  
  afterEach(()=>{
    (User.findOne as sinon.SinonStub).restore();
    sinon.restore()
  })
  
  it('Checa se retorna um token em caso de sucesso com status 200', async () => {
    sinon.stub(User, 'findOne').resolves(UserMock.user as User);
    sinon.stub(bcrypt, 'compareSync').returns(true);
    sinon.stub(jwt, 'createToken').returns(UserMock.token);
  
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(UserMock.login);
      
    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body.token).to.equal(UserMock.token);
  });
});
