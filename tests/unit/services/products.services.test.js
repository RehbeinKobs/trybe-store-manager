const { expect } = require('chai');
const sinon = require('sinon');

const { expectAsyncThrowError } = require('../utils/expectAsyncThrow');
const { productsServices } = require('../../../src/services/');
const { productsModels } = require('../../../src/models/');

const products = require('../mocks/productsMock');

describe('Testes de unidade do service de products', function () {
  afterEach(sinon.restore);
  it('listProducts retorna a lista de todos os produtos', async function () {
    sinon.stub(productsModels, 'listProducts').resolves(products);
    const result = await productsServices.listProducts();
    expect(result).to.deep.equal(products);
  });
  it('listProductById retorna o produto cujo id foi passado por parametro', async function () {
    sinon.stub(productsModels, 'listProductById').resolves(products[0]);
    const result1 = await productsServices.listProductById(1);
    expect(result1).to.deep.equal(products[0]);
  });
  it('listProductById retorna um erro caso id não existir no banco de dados', async function () {
    sinon.stub(productsModels, 'listProductById').resolves(undefined);
    await expectAsyncThrowError(productsServices.listProductById);
  });
});