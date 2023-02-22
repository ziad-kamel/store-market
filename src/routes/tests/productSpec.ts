import supertest from "supertest";
import db from "../../database";
import ProductModel from "../../models/product.model";
import UserModel from "../../models/user.model";
import Product from "../../types/product.type";
import User from "../../types/user.type";
import app from "../../index";

const productModel = new ProductModel();
const userModel = new UserModel();
const req = supertest(app);
let token = "";

describe("Test Product API endpoints", () => {
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

  beforeAll(async () => {
    const createUser = await userModel.createuser(user);
    user.id = createUser.id;

    const createProduct = await productModel.createproduct(product);
    product.id = createProduct.id;
  });
  afterAll(async () => {
    const connection = await db.connect();
    const sql = `DELETE FROM products;`;
    await connection.query(sql);

    const sql2 = `DELETE FROM users;`;
    await connection.query(sql2);

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

  describe("Test CRUD API method for Products", () => {
    it("should create new product", async () => {
      const res = await req
        .post("/api/products/")
        .set("Content-type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "fairouz",
          price: 6,
        } as Product);
      expect(res.status).toBe(200);
      const { name, price } = res.body.productInfo;
      expect(name).toBe("fairouz");
      expect(price).toBe(6);
    });

    it("should get list of products", async () => {
      const res = await req
        .get("/api/products/")
        .set("Content-type", "application/json");
      expect(res.status).toBe(200);

      expect(Object.keys(res.body.products).length).toBe(2);
    });

    it("should get product info ", async () => {
      const res = await req
        .get(`/api/products/${product.id}`)
        .set("Content-type", "application/json");
      expect(res.status).toBe(200);
      expect(res.body.productInfo.name).toBe("egg1");
      expect(res.body.productInfo.price).toBe(3);
    });
  });
});
