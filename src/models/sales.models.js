const conn = require('./connection');

const create = async (body) => {
  const [{ insertId: id }] = await conn.execute('INSERT INTO StoreManager.sales () VALUES ()');
  const values = body.map((sale) => [id, sale.productId, sale.quantity]);
  values.forEach(async (value) => {
    await conn.execute(
      'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
      value,
    );
  });
  return { id, itemsSold: body };
};

module.exports = {
  create,
};