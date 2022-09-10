const { productsServices } = require('../services');

const listProducts = async (_req, res, next) => {
  try {
    const products = await productsServices.listProducts();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

const listProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await productsServices.listProductById(id);
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const { body } = req;
    const product = await productsServices.create(body);
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listProducts,
  listProductById,
  create,
};
