import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import { Response } from 'superagent';
import { teams } from '../tests/mocks/teams'
import User from '../database/models/usersModel';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('testes na página de times', () => {
  afterEach(()=>{ sinon.restore(); });

  let chaiHttpResponse: Response;

  it("carrega todos os times na pagina", async () => {
    const response = await chai
      .request(app)
      .get('/teams');

    expect(response.body).to.be.deep.equal(teams);
  })

  it("carrega time específico", async () => {
    const { id } = teams[0];
    const response = await chai.request(app).get(`/teams/${id}`);
    expect(response.body).to.be.deep.equal(teams[0])
    expect(response.status).to.be.equal(200)
  })

//   it("email e senha inválidos", async () => {
//     const { email, password } = unregisteredUser;
//     const response = await chai.request(app).post('/login').send({ email, password });
//     expect(response.body).to.be.deep.equal({message: "Incorrect email or password"})
//     expect(response.status).to.be.equal(401)
//   })

//   it("email e senha válidos", async () => {
//     const { email, password } = registeredUser;
//     const response = await chai.request(app).post('/login').send({ email, password });
//     expect(response.status).to.be.equal(200)
//   })

//   it("valida o token", async () => {
//     const { email, password } = registeredUser;
//     const response = await chai.request(app).post('/login').send({ email, password });
//     const validate = await chai.request(app).get('/login/validate').set('authorization', token)
//     expect(response.status).to.be.equal(200)
//     expect(validate.status).to.be.equal(200)
//     expect(validate.body).to.be.deep.equal({role: 'admin'})
//   });
  })

  /**
   * Exemplo do uso de stubs com tipos
   */


  // before(async () => {
  //   sinon
  //     .stub(Login, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Login);
  // });

  // after(()=>{
  //   (Login.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });

//   it('Seu sub-teste', () => {
//     expect(false).to.be.eq(true);
//   });
// });
