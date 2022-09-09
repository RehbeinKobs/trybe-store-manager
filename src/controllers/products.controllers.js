const { productsService } = require('../services');

const listProducts = async (_req, res, next) => {
  try {
    const products = await productsService.listProducts();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

const listProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await productsService.listProductById(id);
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listProducts,
  listProductById,
};
