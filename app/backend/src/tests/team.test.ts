import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/TeamModel';
import { Response } from 'superagent';
import teamsMock from './mocks/TeamMock';


chai.use(chaiHttp);

const { expect } = chai;

describe('Testes da rota get /teams', () => {
  let chaiHttpResponse: Response;

  afterEach(()=>{
      sinon.restore()
    })
  
  it('Checa se retorna TODOS os times com status code 200', async () => {
    sinon.stub(Team, 'findAll').resolves(teamsMock as Team[])

    chaiHttpResponse = await chai
      .request(app)
      .get('/teams')

    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body).to.deep.equal(teamsMock);
    expect(chaiHttpResponse.body).to.have.lengthOf(teamsMock.length);
  })
})

describe('Testes da rota get /teams/:id', () => {
  let chaiHttpResponse: Response;

  afterEach(()=>{
      sinon.restore()
    })
  
  it('Checa se retorna UM time com status code 200', async () => {
    sinon.stub(Team, 'findByPk').resolves(teamsMock[9] as Team)

    chaiHttpResponse = await chai
      .request(app)
      .get('/teams/10');

    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body).to.deep.equal(teamsMock[9]);
  })
  
})