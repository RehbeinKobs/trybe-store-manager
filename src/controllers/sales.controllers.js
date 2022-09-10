const { salesServices } = require('../services');

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
  create,
};
