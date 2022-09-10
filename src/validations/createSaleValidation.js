const createError = require('../utils/createError');

const createSaleValidation = (error) => {
  if (error.message.includes('productId" is required')) {
    throw createError(400, '"productId" is required');
  }
  if (error.message.includes('quantity" is required')) {
    throw createError(400, '"quantity" is required');
  }
  if (error.message.includes('quantity" must be greater than or equal to 1')) {
    throw createError(422, '"quantity" must be greater than or equal to 1');
  }
  throw createError(400, error.message);
};

module.exports = createSaleValidation;
