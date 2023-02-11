import * as sinon from 'sinon';
import * as chai from 'chai';
import Users from '../database/models/users';
// @ts-ignore
import chaiHttp = require('chai-http');
chai.use(chaiHttp);

import { app } from '../app';

import { Response } from 'superagent';


const { expect } = chai;

describe('testando a rota login', () => {
  const user = {
    username: 'Admin',
    role: 'admin',
    email: 'admin@admin.com',
    password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
  } as Users;

  before(async () => {sinon.stub(Users, 'findOne').resolves(user)})
  after(async () => {(Users.findOne as sinon.SinonStub).restore()})

  let chaiHttpResponse: Response;

  it('testando a rota login', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({ email: user.email, password: 'secret_admin' });
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.an('object');
    expect(chaiHttpResponse.body).to.have.property('token');

  });
});