const { salesServices } = require('../services');

const listSales = async (_req, res, next) => {
  try {
    const sales = await salesServices.listSales();
    res.status(200).json(sales);
  } catch (error) {
    next(error);
  }
};

const listSalesById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const sales = await salesServices.listSalesById(id);
    res.status(200).json(sales);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const { body } = req;
    const sale = await salesServices.create(body);
    res.status(201).json(sale);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listSales,
  listSalesById,
  create,
};
