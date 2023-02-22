import supertest from "supertest";
import db from "../../database";

import ProductModel from "../../models/product.model";
import UserModel from "../../models/user.model";
import OrderModel from "../../models/order.model";

import Product from "../../types/product.type";
import User from "../../types/user.type";
import Order from "../../types/order.type";

import app from "../../index";

const productModel = new ProductModel();
const userModel = new UserModel();
const orderModel = new OrderModel();

const req = supertest(app);
let token = "";

describe("Test Order API endpoints", () => {
  const user = {
    email: "testo@test.com",
    user_name: "TestUser",
    first_name: "Test",
    last_name: "User",
    password: "test123",
  } as User;

  const product = {
    name: "egg1",
    price: 3,
  } as Product;

  const order = {
    product_id: "",
    user_id: "",
    quantity: 3,
  } as Order;

  beforeAll(async () => {
    const createUser = await userModel.createuser(user);
    user.id = createUser.id;

    const createProduct = await productModel.createproduct(product);
    product.id = createProduct.id;

    const createOrder = await orderModel.createOrder(order);
    order.id = createOrder.id;
    order.product_id = createProduct.id;
    order.user_id = createUser.id as string;
  });
  afterAll(async () => {
    const connection = await db.connect();
    const sql = `DELETE FROM products;`;
    await connection.query(sql);

    const sql2 = `DELETE FROM users;`;
    await connection.query(sql2);

    const sql3 = `DELETE FROM orders;`;
    await connection.query(sql3);

    connection.release();
  });

  describe("Test Authenticate method ", () => {
    it("should be able to authenticate to get token", async () => {
      const res = await req
        .post("/api/users/authenticate")
        .set("Content-type", "application/json")
        .send({
          email: "testo@test.com",
          password: "test123",
        });
      expect(res.status).toBe(200);
      const { id, email, token: userToken } = res.body.userInfo;
      expect(id).toBe(user.id);
      expect(email).toBe("testo@test.com");
      token = userToken;
    });

    it("should be failed to authenticate whith wrong email", async () => {
      const res = await req
        .post("/api/users/authenticate")
        .set("Content-type", "application/json")
        .send({
          email: "wrong@test.com",
          password: "test123",
        });
      expect(res.status).toBe(404);
    });
  });

  describe("Test CRUD API method for Orders", () => {
    it("should create new order", async () => {
      const res = await req
        .post("/api/orders/")
        .set("Content-type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send({
          product_id: product.id,
          user_id: user.id,
          quantity: 6,
        } as Order);
      expect(res.status).toBe(200);
      const { product_id, user_id, quantity } = res.body.orderInfo;
      expect(product_id).toBe(product.id);
      expect(user_id).toBe(user.id);
      expect(quantity).toBe(6);
    });

    it("should get list of products", async () => {
      const res = await req
        .get(`/api/orders/${user.id}`)
        .set("Content-type", "application/json")
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toBe(200);

      expect(Object.keys(res.body.orders).length).toBe(3);
    });
  });
});
