const { productsModels } = require('../models');
const createError = require('../utils/createError');

const listProducts = async () => {
  const products = await productsModels.listProducts();
  return products;
};

const listProductById = async (id) => {
  const products = await productsModels.listProductById(id);
  if (products) return products;
  throw createError(404, 'Product not found');
};

module.exports = {
  listProducts,
  listProductById,
};
