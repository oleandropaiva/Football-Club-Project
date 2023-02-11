import * as sinon from 'sinon';
import * as chai from 'chai';
import User from '../database/models/users';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('testando a rota login', () => {
  const user = {
    username: 'Admin',
    role: 'admin',
    email: 'admin@admin.com',
    password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
  } as User;

  before(async () => {sinon.stub(User, 'findOne').resolves(user)})
  after(async () => {(User.findOne as sinon.SinonStub).restore()})

  let chaiHttpResponse: Response;

  it('testando a rota login', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send(user);
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.an('object');
    expect(chaiHttpResponse.body).to.have.property('token');

  });
});