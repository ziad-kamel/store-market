import db from "../database";
import Order from "../types/order.type";

class OrderModel {
  async createOrder(order: Order): Promise<Order> {
    try {
      const connection = await db.connect();
      const sql = `INSERT INTO orders (product_id, user_id, quantity)
        values ($1, $2, $3) returning id, product_id, user_id, quantity`;
      const result = await connection.query(sql, [
        order.product_id,
        order.user_id,
        order.quantity,
      ]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `unable to create order for user_id: (${order.user_id}), ${
          (error as Error).message
        }`
      );
    }
  }
  async getOrders(user_id: string): Promise<Order[]> {
    try {
      const connection = await db.connect();
      const sql = `SELECT * FROM orders WHERE user_id=($1)`;
      const result = await connection.query(sql, [user_id]);

      const sql1 = `SELECT user_name FROM users WHERE id=($1)`;
      const result1 = await connection.query(sql1, [user_id]);

      const sql2 = `SELECT product_id,quantity FROM orders WHERE user_id=($1)`;
      const result2 = await connection.query(sql2, [user_id]);

      connection.release();
      return [result.rows[0].id, result1.rows[0], result2.rows];
    } catch (error) {
      throw new Error(`Error at retriving orders ${(error as Error).message}`);
    }
  }
}

export default OrderModel;
