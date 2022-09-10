const sinon = require('sinon');
const { expect } = require('chai');

// const { expectAsyncThrowError } = require('../utils/expectAsyncThrow');
const { productsControllers } = require('../../../src/controllers/');
const { productsServices } = require('../../../src/services/');
const createError = require('../../../src/utils/createError');

const products = require('../mocks/productsMock');

describe('Testes de unidade do controller de products', function () {
  afterEach(sinon.restore);

  it('listProducts retorna a lista de todos os produtos', async function () {
    const response = {};
    const res = {
      status: (s) => {
        response.status = s;
        return res;
      },
      json: (p) => {
        response.json = p;
      }
    };
    sinon.stub(productsServices, 'listProducts').resolves(products);
    await productsControllers.listProducts({}, res);
    expect(response.status).to.equal(200);
    expect(response.json).to.equal(products);
  });

  it('em caso de erro listProducts passa para o catch', async function () {
    let error = null;
    const throwError = () => {
      throw createError(500, "internal server error");
    }
    const catchError = (err) => {
      error = err;
    }
    sinon.stub(productsServices, 'listProducts').resolves(throwError);
    await productsControllers.listProducts({}, {}, catchError);
    expect(error).to.be.an("Error");
  });

  it('listProductById retorna o produto cujo id foi passado', async function () {
    const response = {};
    const req = {
      params: { id: 1 },
    }
    const res = {
      status: (s) => {
        response.status = s;
        return res;
      },
      json: (p) => {
        response.json = p;
      }
    };
    sinon.stub(productsServices, 'listProductById').resolves(products[0]);
    await productsControllers.listProductById(req, res);
    expect(response.status).to.equal(200);
    expect(response.json).to.deep.equal(products[0]);
  });
  
  it('em caso de erro listProductById passa para o catch', async function () {
    let error = null;
    const throwError = () => {
      throw createError(500, "internal server error");
    }
    const catchError = (err) => {
      error = err;
    }
    sinon.stub(productsServices, 'listProductById').resolves(throwError);
    await productsControllers.listProductById({}, {}, catchError);
    expect(error).to.be.an("Error");
  });

  it('create retorna o produto inserido', async function () {
    const response = {};
    const req = {
      body: { name: products[0].name },
    }
    const res = {
      status: (s) => {
        response.status = s;
        return res;
      },
      json: (p) => {
        response.json = p;
      }
    };
    sinon.stub(productsServices, 'create').resolves(products[0]);
    await productsControllers.create(req, res);
    expect(response.status).to.equal(201);
    expect(response.json).to.deep.equal(products[0]);
  });

  it('em caso de erro create pasa para o catch', async function () {
    let error = null;
    const throwError = () => {
      throw createError(500, "internal server error");
    }
    const catchError = (err) => {
      error = err;
    }
    sinon.stub(productsServices, 'create').resolves(throwError);
    await productsControllers.create({}, {}, catchError);
    expect(error).to.be.an("Error");
  });
});