const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const { salesModels } = require('../../../src/models/');

const sales = require('../mocks/salesMock');

describe('Testes de unidade do model de sales', function () {
  afterEach(sinon.restore);
  it('listSales retorna a lista de todas as sales', async function () {
    sinon.stub(connection, 'execute').resolves([sales]);
    const result = await salesModels.listSales();
    expect(result).to.deep.equal(sales);
  });
  it('listSalesById retorna as sales cujo id foi passado por parametro', async function () {
    sinon.stub(connection, 'execute').resolves([sales]);
    const result = await salesModels.listSalesById(1);
    expect(result).to.deep.equal(sales);
  });
  it('create retorna a sale criada', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 4 }])
    const result = await salesModels.create(sales);
    expect(result).to.deep.equal({ id: 4, itemsSold: sales });
  });
});
