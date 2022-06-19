import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for restaurant", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a restaurant", async () => {
    const response = await request(app).post("/restaurants").send({
      name: "Paunch Burger",
      phone: "+5588987654321",
      description: "Parks and Recreation",
      address: "District Zero",
    });

    expect(response.status).toBe(200);
    expect(response.body.id).toBeDefined();
    expect(response.body.name).toBe("Paunch Burger");
    expect(response.body.description).toBe("Parks and Recreation");
    expect(response.body.address).toBe("District Zero");
  });

  it("should not create a restaurant", async () => {
    const response = await request(app).post("/restaurants").send({
      name: "Ficticious restaurant name",
    });
    expect(response.status).toBe(500);
  });

  it("should list all restaurants", async () => {
    const response = await request(app).post("/restaurants").send({
      name: "Paunch Burger",
      phone: "+5588987654321",
      description: "Parks and Recreation",
      address: "District Zero",
    });
    expect(response.status).toBe(200);
    const response2 = await request(app).post("/restaurants").send({
      name: "Café Nervosa",
      phone: "+554447654321",
      description: "Tea Shop Mysteries",
      address: "District One",
    });

    expect(response2.status).toBe(200);

    const listResponse = await request(app).get("/restaurants").send();

    expect(listResponse.status).toBe(200);
    expect(listResponse.body.length).toBe(2);
    const restaurant = listResponse.body[0];
    expect(restaurant.name).toBe("Paunch Burger");
    expect(restaurant.phone).toBe("+5588987654321");
    const restaurant2 = listResponse.body[1];
    expect(restaurant2.name).toBe("Café Nervosa");
    expect(restaurant2.phone).toBe("+554447654321");

    const listResponseXML = await request(app)
      .get("/restaurants")
      .set("Accept", "application/xml")
      .send();

    expect(listResponseXML.status).toBe(200);
    expect(listResponseXML.text).toContain(
      `<?xml version="1.0" encoding="UTF-8"?>`
    );
    expect(listResponseXML.text).toContain(`<restaurant>`);
    expect(listResponseXML.text).toContain(`<name>Paunch Burger</name>`);
    expect(listResponseXML.text).toContain(`<phone>+5588987654321</phone>`);
    expect(listResponseXML.text).toContain(`</restaurant>`);
    expect(listResponseXML.text).toContain(`<name>Café Nervosa</name>`);
    expect(listResponseXML.text).toContain(`<phone>+554447654321</phone>`);
    expect(listResponseXML.text).toContain(`<id>`);
    expect(listResponseXML.text).toContain(`</id>`);
  });

  it("should update a restaurant", async () => {
    let response = await request(app).post("/restaurants").send({
      name: "Paunch Burger",
      phone: "+5588987654321",
      description: "Parks and Recreation",
      address: "District Zero",
    });

    const id = response.body.id;

    response = await request(app).put(`/restaurants/${id}`).send({
      name: "The Indigo Tea Shop",
      phone: "+557777654321",
      description: "Happy Days",
      address: "Street Zero",
    });

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(`${id}`);
    expect(response.body.name).toBe("The Indigo Tea Shop");
    expect(response.body.phone).toBe("+557777654321");
    expect(response.body.description).toBe("Happy Days");
    expect(response.body.address).toBe("Street Zero");
  });

  it("should delete a restaurant", async () => {
    let response = await request(app).post("/restaurants").send({
      name: "The Indigo Tea Shop",
      phone: "+557777654321",
      description: "Happy Days",
      address: "Street Zero",
    });

    const id = response.body.id;

    response = await request(app).delete(`/restaurants/${id}`);

    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual({});
  });

  it("should list restaurants reviews", async () => {
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

    response = await request(app).get(`/restaurants/${restaurantId}/reviews`);

    expect(response.status).toBe(200);
    expect(response.body.averageStarsReceived).toBe(4);
    expect(response.body.restaurantId).toBe(restaurantId);
    expect(response.body.reviews.length).toBe(1);
    expect(response.body.reviews[0].stars).toBe(4);
    expect(response.body.reviews[0].comment).toBe("Muito bom!!!");
    expect(response.body.reviews[0].customerId).toBe(id);
  });

  it("should list top five restaurants", async () => {
    let response = await request(app).post("/customers").send({
      name: "John Doe",
      phone: "+5522987654321",
    });

    const id = response.body.id;

    response = await request(app).post("/customers").send({
      name: "Mayra Bellzhnheier",
      phone: "+5522987654321",
    });

    const id2 = response.body.id;

    response = await request(app).post(`/restaurants`).send({
      name: "x",
      phone: "y",
      description: "z",
      address: "w",
    });

    const response2 = await request(app).post(`/restaurants`).send({
      name: "The Indigo Tea Shop",
      phone: "+557777654321",
      description: "Happy Days",
      address: "Street Zero",
    });

    const response3 = await request(app).post(`/restaurants`).send({
      name: "Paunch Burger",
      phone: "+5588987654321",
      description: "Parks and Recreation",
      address: "District Zero",
    });

    expect(response.status).toBe(200);
    expect(response2.status).toBe(200);
    expect(response3.status).toBe(200);
    const restaurantId = response.body.id;
    const restaurantId2 = response2.body.id;
    const restaurantId3 = response3.body.id;

    response = await request(app)
      .post(`/restaurants/${restaurantId}/reviews`)
      .send({
        clientId: id,
        stars: 4,
        comment: "Muito bom!!!",
      });

      await request(app)
      .post(`/restaurants/${restaurantId2}/reviews`)
      .send({
        clientId: id2,
        stars: 3,
        comment: "Muito bom!!!",
      });

       await request(app)
      .post(`/restaurants/${restaurantId3}/reviews`)
      .send({
        clientId: id2,
        stars: 5,
        comment: "Muito bom!!!",
      });

    expect(response.status).toBe(200);

    response = await request(app).get(`/restaurants/top-five`);

    expect(response.status).toBe(200);
    expect(response.body[0].averageReviews).toBe(5);
    expect(response.body[1].averageReviews).toBe(4);
    expect(response.body[2].averageReviews).toBe(3);
    expect(response.body[0].name).toBe("Paunch Burger");
    expect(response.body[0].reviews.length).toBe(1);
    expect(response.body[0].reviews[0].stars).toBe(5);
    expect(response.body[0].id).toBe(restaurantId3);
  });
});
