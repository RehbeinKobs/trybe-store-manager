const Joi = require('joi');
const { productsModels } = require('../models');
const createError = require('../utils/createError');

const bodySchema = Joi.object({
  name: Joi.string().min(5).required(),
}).required();

const listProducts = async () => {
  const products = await productsModels.listProducts();
  return products;
};

const listProductById = async (id) => {
  const product = await productsModels.listProductById(id);
  if (product) return product;
  throw createError(404, 'Product not found');
};

const create = async (body) => {
  const { error } = bodySchema.validate(body);
  if (error) {
    throw error.details[0].type === 'string.min'
    ? createError(422, '"name" length must be at least 5 characters long')
    : createError(400, '"name" is required');
  }
  const product = await productsModels.create(body);
  return product;
};

module.exports = {
  listProducts,
  listProductById,
  create,
};
