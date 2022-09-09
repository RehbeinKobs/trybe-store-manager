const conn = require('./connection');

const listProducts = async () => {
  const [result] = await conn.execute('SELECT * FROM StoreManager.products');
  return result;
};

const listProductById = async (id) => {
  const [[result]] = await conn.execute('SELECT * FROM StoreManager.products WHERE id = ?', [id]);
  return result;
};

module.exports = {
  listProducts,
  listProductById,
};
