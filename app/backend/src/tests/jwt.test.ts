import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import { createToken } from '../authentication/jwt';
import UserMock from './mocks/UserMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('-> JWT Functions', () => {
  let chaiHttpResponse: Response;

  afterEach(()=>{
      sinon.restore()
    })
  
  it('createToken', async () => {
    sinon.stub(jwt, 'sign').resolves(UserMock.token);

    const createdToken = createToken(UserMock.userWithoutPassword)
    expect(createdToken).to.equal(UserMock.token);
  })

});