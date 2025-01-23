const { expect } = require("chai");
const request = require("supertest");
const mongoose = require("mongoose");
// Make sure the path to your app is correct
const { app, server } = require("../app");

describe("Product Routes", () => {
  before(async () => {
    await mongoose.connect(
      "mongodb+srv://sachin:crSLpyAIhR4Bh4a2@pizza-mania.pfzz6.mongodb.net/?retryWrites=true&w=majority&appName=pizza-mania"
    );
  });

  // after(async () => {
  //   await mongoose.connection.close();
  // });

  describe("GET /products", () => {
    it("should return all products", async () => {
      const response = await request(app).get("/api/products/");
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an("array");
    });
  });

  describe("POST /products", () => {
    it("should create a new product", async () => {
      const newProduct = {
        name: "Test piza",
        price: 9999,
        category: "pizza",
      };

      const response = await request(app)
        .post("/api/products")
        .send(newProduct);

      expect(response.status).to.equal(201);
      expect(response.body).to.have.property("name", newProduct.name);
      expect(response.body).to.have.property("price", newProduct.price);
    });

    it("should return 400 for invalid product data", async () => {
      const invalidProduct = { name: "" };

      const response = await request(app)
        .post("/api/products")
        .send(invalidProduct);

      expect(response.status).to.equal(400);
      expect(response.body).to.have.property("message");
    });
  });

  describe("GET /products/:id", () => {
    let productId = "6782a3e490eed6290cbc33c7";

    before(async () => {
      const response = await request(app).post("/api/products").send({
        name: "Test Product",
        price: 99.99,
        category: "electronics",
      });
      productId = response.body._id;
    });

    it("should return a product by id", async () => {
      const response = await request(app).get(`/api/products/${productId}`);
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property("_id", productId);
    });

    it("should return 404 for non-existent product", async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const response = await request(app).get(`/products/${fakeId}`);
      expect(response.status).to.equal(404);
    });
  });
});

describe("Order Routes", () => {
  describe("GET /orders", () => {
    it("should return all orders", async () => {
      const response = await request(app).get("/api/orders");
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an("array");
    });
  });

  describe("GET /orders/:id", () => {
    let orderId = "6783639314bcb3c00e1acf27";

    before(async () => {
      const response = await request(app)
        .post("/api/orders")
        .send({
          customer: new mongoose.Types.ObjectId(),
          items: [],
          status: {
            type: String,
            enum: ["pending", "paid", "delivered"],
            default: "pending",
          },
        });
      orderId = response.body._id;
    });

    it("should return an order by id", async () => {
      const response = await request(app).get(`/api/orders/${orderId}`);
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property("_id", orderId);
    });
  });

  describe("PUT /orders/:id/deliver", () => {
    let orderId = "678385cc110762ba0b0e51f5";

    before(async () => {
      const response = await request(app).post("/api/orders").send({
        customer: new mongoose.Types.ObjectId(),
        items: [],
        status: "paid",
      });
      orderId = response.body._id;
    });

    it("should mark order as delivered", async () => {
      const response = await request(app).put(`/orders/${orderId}/deliver`);
      expect(response.status).to.equal(200);
      expect(response.body.order.status).to.equal("delivered");
    });
  });
});
