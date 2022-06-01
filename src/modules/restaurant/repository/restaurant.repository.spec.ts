import { Sequelize } from "sequelize-typescript";
import Id from "../../@shared/domain/value-object/id.value-object";
import { ReviewModel } from "../../review/repository/review.model";
import Restaurant from "../domain/restaurant.entity";
import { RestaurantModel } from "./restaurant.model";
import RestaurantRepository from "./restaurant.repository";

describe("Restaurant repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([RestaurantModel, ReviewModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a new Restaurant", async () => {
    const props = {
      id: new Id("1"),
      name: "Restaurant 1",
      phone: "56568880",
      description: "A simple restaurant",
      address: "Av 22, Monte Dxx",
    };
    const restaurant = new Restaurant(props);
    const restaurantRepository = new RestaurantRepository();

    await restaurantRepository.create(restaurant);

    const restaurantDb = await RestaurantModel.findOne({
      where: { id: props.id.id },
    });

    expect(props.id.id).toBe(restaurantDb.id);
    expect(props.name).toBe(restaurantDb.name);
    expect(props.phone).toBe(restaurantDb.phone);
    expect(props.description).toBe(restaurantDb.description);
    expect(props.address).toBe(restaurantDb.address);
  });
  it("should update a restaurant", async () => {
    const props = {
      id: new Id("1"),
      name: "Restaurant 1",
      phone: "56568880",
      description: "A simple restaurant",
      address: "Av 22, Monte Dxx",
    };
    const restaurant = new Restaurant(props);
    const restaurantRepository = new RestaurantRepository();

    await restaurantRepository.create(restaurant);


    restaurant.changeName("Restaurant updated");
    restaurant.changePhone("phone updated");

    await restaurantRepository.update(restaurant);
    const updatedRestaurant = await RestaurantModel.findOne({
      where: { id: "1" },
    });

    expect(updatedRestaurant.toJSON()).toStrictEqual({
      id: "1",
      name: "Restaurant updated",
      phone: "phone updated",
      description: restaurant.description,
      address: restaurant.address,
      createdAt: restaurant.createdAt,
      updatedAt: restaurant.updatedAt,
      numberOfReviews: null,
    });
  });
  it("should find all customers", async () => {
    const props = {
      id: new Id("1"),
      name: "Restaurant 1",
      phone: "56568880",
      description: "A simple restaurant",
      address: "Av 22, Monte Dxx",
    };
    const restaurant = new Restaurant(props);
    const restaurant2 = new Restaurant({ ...props, id: new Id("2"), name: "Restaurant 2", phone: "455454"})
    const restaurantRepository = new RestaurantRepository();

    await restaurantRepository.create(restaurant);
    await restaurantRepository.create(restaurant2);


    const allRestaurants = await RestaurantModel.findAll();

    expect(allRestaurants).toHaveLength(2);
    expect(allRestaurants[0].id).toEqual(restaurant.id.id);
    expect(allRestaurants[0].name).toEqual(restaurant.name);
    expect(allRestaurants[0].phone).toEqual(restaurant.phone);
    expect(allRestaurants[1].id).toStrictEqual(restaurant2.id.id);
    expect(allRestaurants[1].name).toEqual(restaurant2.name);
    expect(allRestaurants[1].phone).toEqual(restaurant2.phone);
  });
  it("should delete a restaurant", async () => {
    const props = {
      id: new Id("1"),
      name: "Restaurant 1",
      phone: "56568880",
      description: "A simple restaurant",
      address: "Av 22, Monte Dxx",
    };
    const restaurant = new Restaurant(props);
    const restaurantRepository = new RestaurantRepository();

    await restaurantRepository.create(restaurant);

    const restaurantDb = await RestaurantModel.findOne({
      where: { id: props.id.id },
    });

    expect(props.id.id).toBe(restaurantDb.id);
    expect(props.name).toBe(restaurantDb.name);
    expect(props.phone).toBe(restaurantDb.phone);

    await RestaurantModel.destroy({ where: { id: props.id.id } });

    const restaurantDeleted = await RestaurantModel.findOne({
      where: { id: props.id.id },
    });

    expect(restaurantDeleted).toBeNull();

  });
});
