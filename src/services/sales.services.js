const Joi = require('joi');
const { salesModels } = require('../models');
const createError = require('../utils/createError');
const createSaleValidation = require('../validations/createSaleValidation');
const checkForProducts = require('../validations/checkForProducts');

const createSchema = Joi.array().items(Joi.object({
  productId: Joi.number().integer().min(1).required(),
  quantity: Joi.number().integer().min(1).required(),
})).min(1).required();

const listSales = async () => {
  const sales = await salesModels.listSales();
  return sales;
};

const listSalesById = async (id) => {
  const sales = await salesModels.listSalesById(id);
  if (sales.length > 0) return sales;
  throw createError(404, 'Sale not found');
};

const create = async (body) => {
  const { error } = createSchema.validate(body);
  if (error) createSaleValidation(error);
  await checkForProducts(body.map(({ productId }) => productId));
  const sales = await salesModels.create(body);
  return sales;
}; 

module.exports = {
  listSales,
  listSalesById,
  create,
};
