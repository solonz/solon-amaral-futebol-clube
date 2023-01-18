import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import { Response } from 'superagent';
import { AllPartidas, unprocessable } from '../tests/mocks/matches'
import { token } from '../tests/mocks/login'
import User from '../database/models/usersModel';
import Match from '../database/models/matchesModel';
import Team from '../database/models/teamsModel';
import { oneTeam, teams } from './mocks/teams';
import { IMatch } from '../interfaces';
import jwt from '../helpers/jwt';
import JWT from '../helpers/jwt';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe(' 1 - testes na página de Partidas', () => {
  afterEach(()=> { 
    (Match.findAll as sinon.SinonStub).restore();
});

  let chaiHttpResponse: Response;

  it("1.1 - retorna todas as partidas", async () => {
    sinon.stub(Match, 'findAll').resolves(AllPartidas as unknown[] as Match[])
       const response = await chai.request(app).get('/matches');

    expect(response.body).to.be.deep.equal(AllPartidas);
    expect(response.status).to.be.equal(200);
})

it('1.2 - Returns matches that are in progress', async () => {
    sinon
      .stub(Match, 'findAll')
      .resolves([AllPartidas[0]] as unknown[] as Match[]);

    chaiHttpResponse = await chai
      .request(app)
      .get('/matches?inProgress=true');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.deep.equal([AllPartidas[0]]);
  });

  it('1.3 - Returns matches that are NOT in progress', async () => {
    sinon
      .stub(Match, 'findAll')
      .resolves([AllPartidas[1]] as unknown[] as Match[]);

    chaiHttpResponse = await chai
      .request(app)
      .get('/matches?inProgress=false');

    expect(chaiHttpResponse.status).to.be.equal(200);
        expect(chaiHttpResponse.body).to.deep.equal([AllPartidas[1]]);
  });
})

  // describe('2 - testes na página de Partidas', () => {

  //   let chaiHttpResponse: Response;

  // it('2.2 - cria partida', async () => {

  //   const create = {
  //     homeTeam: 1,
  //     awayTeam: 2,
  //     homeTeamGoals: 1,
  //     awayTeamGoals: 0,
  //   }

  //   const created = {
  //     id: 1,
  //     homeTeam: 1,
  //     awayTeam: 2,
  //     homeTeamGoals: 1,
  //     awayTeamGoals: 0,
  //     inProgress: false,
  //   }
  //       sinon.stub(JWT, 'validateToken').resolves(true);
  //       sinon.stub(Match, "create").resolves(created as Match);

  //       chaiHttpResponse = await chai.request(app)
  //       .post('/matches')
  //       .set('authorization', token)
  //       .send(create)

  //       console.log(create);
  //       console.log(created);
  //       console.log(chaiHttpResponse.body);
        
        
  //   expect(chaiHttpResponse.status).to.be.equal(201);
  //   expect(chaiHttpResponse.body).to.be.deep.equal(created);
  // });

  // it('Fails if the homeTeam is equal to awayTeam', async () => {
  //   chaiHttpResponse = await chai
  //     .request(app)
  //     .post('/matches')
  //     .send(unprocessable)
  //     .set('Authorization', 'something');

  //   expect(chaiHttpResponse.status).to.be.equal(
  //     422
  //   );
  //   expect(chaiHttpResponse.body).to.deep.equal({
  //     message:
  //       'It is not possible to create a match with two equal teams',
  //   });
  // });
// })
