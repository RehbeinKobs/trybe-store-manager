const { expect } = require('chai');
const sinon = require('sinon');

const { expectAsyncThrowError } = require('../utils/expectAsyncThrow');
const { salesServices } = require('../../../src/services/');
const { salesModels } = require('../../../src/models/');

const itemsSold = require('../mocks/salesMock');

describe('Testes de unidade do service de sales', function () {
  afterEach(sinon.restore);
  it('create retorna a sale criada', async function () {
    sinon.stub(salesModels, 'create').resolves({ id: 4, itemsSold });
    const result = await salesServices.create(itemsSold);
    expect(result).to.deep.equal({ id: 4, itemsSold });
  });
  it('create retorna um erro caso algum parametro esteja errado', async function () {
    sinon.stub(salesModels, 'create').resolves({ id: 4, itemsSold });
    const result = await salesServices.create;
    expectAsyncThrowError(result);
  });
});
