const { productsModels } = require('../models');
const createError = require('../utils/createError');

const checkForProducts = async (ids) => {
  const products = await productsModels.listProducts();
  const productsIds = products.map(({ id }) => id);
  if (!ids.every((id) => productsIds.includes(id))) {
    throw createError(404, 'Product not found');
  }
};

module.exports = checkForProducts;