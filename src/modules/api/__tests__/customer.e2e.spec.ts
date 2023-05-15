import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for customer", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a customer", async () => {
    const response = await request(app).post("/customers").send({
      name: "John Doe",
      phone: "+5522987654321",
    });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("John Doe");
    expect(response.body.phone).toBe("+5522987654321");
  });

  it("should not create a customer", async () => {
    const response = await request(app).post("/customers").send({
      name: "john",
    });
    expect(response.status).toBe(500);
    expect(response.body).toStrictEqual({
      errors: [{ context: "customer", message: "Phone is required" }],
    });
  });

  it("should list all customer", async () => {
    const response = await request(app).post("/customers").send({
      name: "John Doe",
      phone: "+5522987654321",
    });
    expect(response.status).toBe(200);
    const response2 = await request(app).post("/customers").send({
      name: "Jane",
      phone: "+55222255887",
    });
    expect(response2.status).toBe(200);

    const listResponse = await request(app).get("/customers").send();

    expect(listResponse.status).toBe(200);
    expect(listResponse.body.length).toBe(2);
    const customer = listResponse.body[0];
    expect(customer.name).toBe("John Doe");
    expect(customer.phone).toBe("+5522987654321");
    const customer2 = listResponse.body[1];
    expect(customer2.name).toBe("Jane");
    expect(customer2.phone).toBe("+55222255887");

    const listResponseXML = await request(app)
      .get("/customers")
      .set("Accept", "application/xml")
      .send();

    expect(listResponseXML.status).toBe(200);
    expect(listResponseXML.text).toContain(
      `<?xml version="1.0" encoding="UTF-8"?>`
    );
    expect(listResponseXML.text).toContain(`<customer>`);
    expect(listResponseXML.text).toContain(`<name>John Doe</name>`);
    expect(listResponseXML.text).toContain(`<phone>+5522987654321</phone>`);
    expect(listResponseXML.text).toContain(`</customer>`);
    expect(listResponseXML.text).toContain(`<name>Jane</name>`);
    expect(listResponseXML.text).toContain(`<phone>+55222255887</phone>`);
    expect(listResponseXML.text).toContain(`<id>`);
    expect(listResponseXML.text).toContain(`</id>`);
  });

  it("should update a customer", async () => {
    let response = await request(app).post("/customers").send({
      name: "John Doe",
      phone: "+5522987654321",
    });

    const id = response.body.id;

    response = await request(app).put(`/customers/${id}`).send({
      name: "Alex Brown",
      phone: "+5555555555",
    });

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(`${id}`);
    expect(response.body.name).toBe("Alex Brown");
    expect(response.body.phone).toBe("+5555555555");
  });

  it("should delete a customer", async () => {
    let response = await request(app).post("/customers").send({
      name: "John Doe",
      phone: "+5522987654321",
    });

    const id = response.body.id;

    response = await request(app).delete(`/customers/${id}`);

    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual({});
  });

  it("should list customer reviews", async () => {
    let response = await request(app).post("/customers").send({
      name: "John Doe",
      phone: "+5522987654321",
    });

    const id = response.body.id;

    response = await request(app).post(`/restaurants`).send({
      name: "x",
      phone: "y",
      description: "z",
      address: "w",
    });

    expect(response.status).toBe(200);
    const restaurantId = response.body.id;

    response = await request(app)
      .post(`/restaurants/${restaurantId}/reviews`)
      .send({
        clientId: id,
        stars: 4,
        comment: "Muito bom!!!",
      });

    expect(response.status).toBe(200);

    response = await request(app).get(`/customers/${id}/reviews`);

    expect(response.status).toBe(200);
    expect(response.body.averageStarsGiven).toBe(4);
    expect(response.body.customerId).toBe(id);
    expect(response.body.reviews.length).toBe(1);
    expect(response.body.reviews[0].stars).toBe(4);
    expect(response.body.reviews[0].restaurantId).toBe(restaurantId);
  });
});
