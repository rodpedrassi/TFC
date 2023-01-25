import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/TeamModel';
import MatchModel from '../database/models/MatchModel';
import { Response } from 'superagent';
import teamsMock from './mocks/TeamMock';
import matchMock from './mocks/MatchMock';
import UserMock from './mocks/UserMock';
import MatchMock from './mocks/MatchMock';


chai.use(chaiHttp);

const { expect } = chai;

describe('Testes da rota get /matches', () => {
  let chaiHttpResponse: Response;

  afterEach(()=>{
      sinon.restore()
    })
  
  it('Checa se retorna TODOS as partidas com status code 200', async () => {
    sinon.stub(MatchModel, 'findAll').resolves(matchMock.matches as unknown as MatchModel[])

    chaiHttpResponse = await chai
      .request(app)
      .get('/matches')

    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body).to.deep.equal(matchMock.matches);
    expect(chaiHttpResponse.body).to.have.lengthOf(matchMock.matches.length);
  })
})

describe('Testes da rota get /matches?inProgress=', () => {
    let chaiHttpResponse: Response;
  
    afterEach(()=>{
        sinon.restore()
      })
    it('Checa o resultado da query inProgress=true', async () => {
      const inProgressTrue = matchMock.matches.filter((e) => e.inProgress === true);
      sinon.stub(MatchModel, 'findAll').resolves(inProgressTrue as unknown as MatchModel[]);
  
      chaiHttpResponse = await chai
        .request(app)
        .get('/matches?inProgress=true');
  
      expect(chaiHttpResponse.status).to.equal(200);
      expect(chaiHttpResponse.body).to.deep.equal(inProgressTrue);
    })
    
    it('Checa o resultado da query inProgress=false', async () => {
      const inProgressFalse = matchMock.matches.filter((e) => e.inProgress === false);
      sinon.stub(MatchModel, 'findAll').resolves(inProgressFalse as unknown as MatchModel[]);
  
      chaiHttpResponse = await chai
        .request(app)
        .get('/matches?inProgress=false');
  
      expect(chaiHttpResponse.status).to.equal(200);
      expect(chaiHttpResponse.body).to.deep.equal(inProgressFalse);
    })
  
  });

describe('Testes da rota post /matches', () => {
  let chaiHttpResponse: Response;

  afterEach(()=>{
      sinon.restore()
    })

  it('Checa se é possivel criar uma partida com sucesso', async () => {
    sinon.stub(MatchModel, 'findByPk')
      .onFirstCall().resolves(teamsMock[1] as Team)
      .onSecondCall().resolves(teamsMock[2] as Team);

    sinon.stub(MatchModel, 'create').resolves(matchMock.createMatch as MatchModel); 

    chaiHttpResponse = await chai
      .request(app)
      .post('/matches')
      .send(matchMock.createMatch)
      .set('Authorization', UserMock.token);
  
    expect(chaiHttpResponse.status).to.equal(201);
    expect(chaiHttpResponse.body).to.deep.equal(matchMock.createMatch);
  })

  it('Checa se ao tentar cadastrar uma partida com 2 times iguais retorna o esperado', async () => {

    chaiHttpResponse = await chai
      .request(app)
      .post('/matches')
      .send(matchMock.sameTeams)
      .set('Authorization', UserMock.token);
      
    expect(chaiHttpResponse.status).to.equal(422);
    expect(chaiHttpResponse.body.message).to.equal('It is not possible to create a match with two equal teams');
  })   

  it('Checa se ao tentar cadastrar uma partida com um time que não existe retorna o esperado', async () => {

    chaiHttpResponse = await chai
      .request(app)
      .post('/matches')
      .send(matchMock.notTeams)
      .set('Authorization', UserMock.token);


    expect(chaiHttpResponse.status).to.equal(404);
    expect(chaiHttpResponse.body.message).to.equal('There is no team with such id!');
  })   
})

describe('Testes da rota patch /matches/:id', () => {
    let chaiHttpResponse: Response;
  
    afterEach(()=>{
      sinon.restore()
    });

    it('SUCCESS', async () => {
      sinon.stub(MatchModel, 'update').resolves([1]);
  
      chaiHttpResponse = await chai
        .request(app)
        .patch('/matches/555')
        .send(MatchMock.updateGoals)
        .set('Authorization', UserMock.token);
  
      expect(chaiHttpResponse.status).to.equal(200);
      expect(chaiHttpResponse.body).to.deep.equal({message: 'Score updated successfully'});
    });
});

describe('Testes da rota patch /matches/:id/finish', () => {
    let chaiHttpResponse: Response;
  
    afterEach(()=>{
        sinon.restore()
      })
    
    it('SUCCESS', async () => {
      sinon.stub(MatchModel, 'update').resolves([1]);
  
      chaiHttpResponse = await chai
        .request(app)
        .patch('/matches/1/finish');
  
        expect(chaiHttpResponse.status).to.equal(200);
        expect(chaiHttpResponse.body.message).to.equal('Finished');
    })
});