const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const { productsModels } = require('../../../src/models/');

const products = require('../mocks/productsMock');

describe('Testes de unidade do model de products', function () {
  afterEach(sinon.restore);
  it('listProducts retorna a lista de todos os produtos', async function () {
    sinon.stub(connection, 'execute').resolves([products]);
    const result = await productsModels.listProducts();
    expect(result).to.deep.equal(products);
  });
  it('listProductById retorna o produto cujo id foi passado por parametro', async function () {
    sinon.stub(connection, 'execute').resolves([[products[0]]]);
    const result1 = await productsModels.listProductById(1);
    expect(result1).to.deep.equal(products[0]);
  });
});