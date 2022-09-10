const sinon = require('sinon');
const { expect } = require('chai');

// const { expectAsyncThrowError } = require('../utils/expectAsyncThrow');
const { salesControllers } = require('../../../src/controllers/');
const { salesServices } = require('../../../src/services/');
const createError = require('../../../src/utils/createError');

const body = require('../mocks/salesMock');

describe('Testes de unidade do controller de sales', function () {
  afterEach(sinon.restore);
  it('create retorna a sale criada', async function () {
    const response = {};
    const req = { body }
    const res = {
      status: (s) => {
        response.status = s;
        return res;
      },
      json: (p) => {
        response.json = p;
      }
    };
    sinon.stub(salesServices, 'create').resolves(body);
    await salesControllers.create(req, res);
    expect(response.status).to.equal(201);
    expect(response.json).to.equal(body);
  });
  it('em caso de erro create passa para o catch', async function () {
    let error = null;
    const throwError = () => {
      throw createError(500, "internal server error");
    }
    const catchError = (err) => {
      error = err;
    }
    sinon.stub(salesServices, 'create').resolves(throwError);
    await salesControllers.create({}, {}, catchError);
    expect(error).to.be.an("Error");
  });
});
