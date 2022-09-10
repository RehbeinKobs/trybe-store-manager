const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const { salesModels } = require('../../../src/models/');

const sales = require('../mocks/salesMock');

describe('Testes de unidade do model de sales', function () {
  afterEach(sinon.restore);
  it('create retorna a sale criada', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 4 }])
    const result = await salesModels.create(sales);
    expect(result).to.deep.equal({ id: 4, itemsSold: sales });
  });
});
