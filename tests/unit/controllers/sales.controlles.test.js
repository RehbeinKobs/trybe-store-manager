const sinon = require('sinon');
const { expect } = require('chai');

// const { expectAsyncThrowError } = require('../utils/expectAsyncThrow');
const { salesControllers } = require('../../../src/controllers/');
const { salesServices } = require('../../../src/services/');
const createError = require('../../../src/utils/createError');

const sales = require('../mocks/salesMock');

let error = null;
let response = {};
const res = {
  status: (s) => {
    response.status = s;
    return res;
  },
  json: (p) => {
    response.json = p;
  }
};
const throwError = () => {
  throw createError(500, "internal server error");
}
const catchError = (err) => {
  error = err;
}

describe('Testes de unidade do controller de sales', function () {
  afterEach(sinon.restore);
  it('listSales retorna a lista de todas as sales', async function () {
    response = {};
    sinon.stub(salesServices, 'listSales').resolves(sales);
    await salesControllers.listSales({}, res);
    expect(response.status).to.equal(200);
    expect(response.json).to.equal(sales);
  });
  it('em caso de erro listSales passa para o catch', async function () {
    error = null;
    sinon.stub(salesServices, 'listSales').resolves(throwError);
    await salesControllers.listSales({}, {}, catchError);
    expect(error).to.be.an("Error");
  });
  it('listSalesById retorna as sales cujo id foi passado', async function () {
    responte = {};
    const req = {
      params: { id: 1 },
    }
    sinon.stub(salesServices, 'listSalesById').resolves(sales);
    await salesControllers.listSalesById(req, res);
    expect(response.status).to.equal(200);
    expect(response.json).to.deep.equal(sales);
  });
  it('em caso de erro listSalesById passa para o catch', async function () {
    error = null;
    sinon.stub(salesServices, 'listSalesById').resolves(throwError);
    await salesControllers.listSalesById({}, {}, catchError);
    expect(error).to.be.an("Error");
  });
  it('create retorna a sale criada', async function () {
    response = {};
    const req = { body: sales }
    sinon.stub(salesServices, 'create').resolves(sales);
    await salesControllers.create(req, res);
    expect(response.status).to.equal(201);
    expect(response.json).to.equal(sales);
  });
  it('em caso de erro create passa para o catch', async function () {
    error = null;
    sinon.stub(salesServices, 'create').resolves(throwError);
    await salesControllers.create({}, {}, catchError);
    expect(error).to.be.an("Error");
  });
});
