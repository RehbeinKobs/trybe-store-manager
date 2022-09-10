const { expect } = require('chai');
const sinon = require('sinon');

const { expectAsyncThrowError } = require('../utils/expectAsyncThrow');
const { salesServices } = require('../../../src/services/');
const { salesModels } = require('../../../src/models/');

const sales = require('../mocks/salesMock');

describe('Testes de unidade do service de sales', function () {
  afterEach(sinon.restore);
  it('listSales retorna a lista de todas as sales', async function () {
    sinon.stub(salesModels, 'listSales').resolves(sales);
    const result = await salesServices.listSales();
    expect(result).to.deep.equal(sales);
  });
  it('listSalesById retorna as sales cujo id foi passado por parametro', async function () {
    sinon.stub(salesModels, 'listSalesById').resolves(sales);
    const result = await salesServices.listSalesById(1);
    expect(result).to.deep.equal(sales);
  });
  it('listSalesById retorna um erro caso id não existir no banco de dados', async function () {
    sinon.stub(salesModels, 'listSalesById').resolves([]);
    await expectAsyncThrowError(salesServices.listSalesById);
  });
  it('create retorna a sale criada', async function () {
    sinon.stub(salesModels, 'create').resolves({ id: 4, itemsSold: sales });
    const result = await salesServices.create(sales);
    expect(result).to.deep.equal({ id: 4, itemsSold: sales });
  });
  it('create retorna um erro caso algum parametro esteja errado', async function () {
    sinon.stub(salesModels, 'create').resolves({ id: 4, itemsSold: sales });
    const result = await salesServices.create;
    expectAsyncThrowError(result);
  });
});
