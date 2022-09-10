const conn = require('./connection');

const listProducts = async () => {
  const [result] = await conn.execute('SELECT * FROM StoreManager.products');
  return result;
};

const listProductById = async (id) => {
  const [[result]] = await conn.execute('SELECT * FROM StoreManager.products WHERE id = ?', [id]);
  return result;
};

const create = async (body) => {
  const { name } = body;
  const [{ insertId }] = await conn.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?)', [name],
  );
  return { id: insertId, ...body };
};

module.exports = {
  listProducts,
  listProductById,
  create,
};
