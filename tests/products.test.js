const request = require("supertest");
const app = require("../main.js");
const { Product } = require("../models/index");
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config/config.json")["development"];

describe("testing/products", () => {
  const product = {
    name: "Product Name",
    price: 55,
    description: "Product description",
    image: "Product image",
    active: true,
  };
  let token;
  test("Create a product", async () => {
    let productCount = await Product.count();
    expect(productCount).toBe(0);

    const res = await request(app).post("/products").send(product).expect(201);
    // .set({ Authorization: token });
    productCount = await Product.count();
    expect(productCount).toBe(1);

    expect(res.body.product.id).toBeDefined();
    expect(res.body.product.createdAt).toBeDefined();
    expect(res.body.product.updatedAt).toBeDefined();

    const createdProduct = {
      ...product,
      id: res.body.product.id,
      createdAt: res.body.product.createdAt,
      updatedAt: res.body.product.updatedAt,
    };
    const newProduct = res.body.product;
    expect(newProduct).toEqual(createdProduct);
  });
});
