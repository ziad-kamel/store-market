import OrdertModel from "../order.model";
import db from "../../database";
import Order from "../../types/order.type";

const ordertModel = new OrdertModel();

describe("Order Model", () => {
  describe("Test method exists ", () => {
    it("should have an get Many Orders method ", () => {
      expect(ordertModel.getOrders).toBeDefined();
    });

    it("should have a create Order method ", () => {
      expect(ordertModel.createOrder).toBeDefined();
    });
  });

  describe("Test Order Model Logic", () => {
    const order = {
      product_id: "1",
      user_id: "80973e75-d233-4693-a22a-1368505a4f83",
      quantity: 5,
    } as Order;
    beforeAll(async () => {
      const createOrder = await ordertModel.createOrder(order);
      order.id = createOrder.id;
    });

    afterAll(async () => {
      const connection = await db.connect();
      const sql = `DELETE FROM orders;`;
      await connection.query(sql);
      connection.release();
    });

    it("create should return a new order ", async () => {
      const createOrder = await ordertModel.createOrder({
        product_id: "2",
        user_id: "80973e75-d233-4693-a22a-1368505a4f83",
        quantity: 9,
      } as Order);

      expect(createOrder).toEqual({
        id: createOrder.id,
        product_id: "2",
        user_id: "80973e75-d233-4693-a22a-1368505a4f83",
        quantity: 9,
      } as Order);
    });

    it("Get Many method should return all available orders", async () => {
      const orders = await ordertModel.getOrders(
        "80973e75-d233-4693-a22a-1368505a4f83"
      );
      expect(orders.length).toBe(3);
    });
  });
});
