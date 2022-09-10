const conn = require('./connection');

const listSales = async () => {
  const [sales] = await conn.execute(
    `SELECT sale_id AS saleId, date, product_id AS productId, quantity
     FROM StoreManager.sales_products AS sp
     JOIN StoreManager.sales AS sa
     ON sp.sale_id = sa.id
     ORDER BY sale_id, product_id;`,
  );
  return sales;
};

const listSalesById = async (id) => {
  const [sales] = await conn.execute(
    `SELECT date, product_id AS productId, quantity
     FROM StoreManager.sales_products AS sp
     JOIN StoreManager.sales AS sa
     ON sp.sale_id = sa.id
     WHERE sale_id = ?
     ORDER BY sale_id, product_id;`, [id],
  );
  return sales;
};

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
  listSales,
  listSalesById,
  create,
};