import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import { Response } from 'superagent';
import { token, registeredUser, unregisteredUser } from '../tests/mocks/login'

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('testes na página de Login', () => {
  afterEach(()=>{ sinon.restore(); });

  let chaiHttpResponse: Response;

  it("ausência de email", async () => {
    const { email } = unregisteredUser;
    const response = await chai
      .request(app)
      .post('/login')
      .send({ email });

    expect(response.body).to.be.deep.equal({message: "All fields must be filled"});
  })

  it("ausência de senha", async () => {
    const { password } = unregisteredUser;
    const response = await chai.request(app).post('/login').send({ password });
    expect(response.body).to.be.deep.equal({message: "All fields must be filled"})
    expect(response.status).to.be.equal(400)
  })

  it("email e senha inválidos", async () => {
    const { email, password } = unregisteredUser;
    const response = await chai.request(app).post('/login').send({ email, password });
    expect(response.body).to.be.deep.equal({message: "Incorrect email or password"})
    expect(response.status).to.be.equal(401)
  })

  it("email e senha válidos", async () => {
    const { email, password } = registeredUser;
    const response = await chai.request(app).post('/login').send({ email, password });
    expect(response.status).to.be.equal(200)
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
})
