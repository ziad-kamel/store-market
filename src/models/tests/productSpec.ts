import ProductModel from "../product.model";
import db from "../../database";
import Product from "../../types/product.type";

const productModel = new ProductModel();

describe("Product Model", () => {
  describe("Test method exists ", () => {
    it("should have an get Many Products method ", () => {
      expect(productModel.getProducts).toBeDefined();
    });

    it("should have a get One Product method ", () => {
      expect(productModel.getOneProduct).toBeDefined();
    });

    it("should have a create Product method ", () => {
      expect(productModel.createproduct).toBeDefined();
    });
  });

  describe("Test Product Model Logic", () => {
    const product = { name: "egg", price: 5 } as Product;

    beforeAll(async () => {
      const createProduct = await productModel.createproduct(product);
      product.id = createProduct.id;
    });

    afterAll(async () => {
      const connection = await db.connect();
      const sql = `DELETE FROM products;`;
      await connection.query(sql);
      connection.release();
    });

    it("create should return a new product ", async () => {
      const createProduct = await productModel.createproduct({
        name: "water",
        price: 2,
      } as Product);

      expect(createProduct).toEqual({
        id: createProduct.id,
        name: "water",
        price: 2,
      } as Product);
    });

    it("Get Many method should return all available products in DB", async () => {
      const products = await productModel.getProducts();
      expect(products.length).toBe(2);
    });

    it("Get one Method should return egg when called with ID", async () => {
      const returnedProduct = await productModel.getOneProduct(
        product.id as string
      );
      expect(returnedProduct.id).toBe(product.id);
      expect(returnedProduct.name).toBe(product.name);
      expect(returnedProduct.price).toBe(product.price);
    });
  });
});
