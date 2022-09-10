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
    const result = await productsServices.listProductById(1);
    expect(result).to.deep.equal(products[0]);
  });
  it('listProductById retorna um erro caso id não existir no banco de dados', async function () {
    sinon.stub(productsModels, 'listProductById').resolves(undefined);
    await expectAsyncThrowError(productsServices.listProductById);
  });
  it('create retorna o produto inserido', async function () {
    sinon.stub(productsModels, 'create').resolves(products[0]);
    const result = await productsServices.create({ name: "xablau" });
    expect(result).to.deep.equal(products[0]);
  });
  it('create retorna um erro caso o body não possua a chave "name"', async function () {
    const call = () => productsServices.create({ noname: "xablau" });
    await expectAsyncThrowError(call);
  });
  it('create retorna um erro caso o name seja tenha menos de 5 chars', async function () {
    const call = () => productsServices.create({ name: "xabl" });
    await expectAsyncThrowError(call);
  });
});