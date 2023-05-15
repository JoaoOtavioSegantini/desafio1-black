import { Sequelize } from "sequelize-typescript";
import { ReviewModel } from "../../../review/repository/review.model";
import { RestaurantModel } from "../../repository/restaurant.model";
import RestaurantRepository from "../../repository/restaurant.repository";
import DeleteRestaurantUseCase from "./delete.restaurant.usecase";

describe("Delete restaurant integration test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    jest.useFakeTimers("modern").setSystemTime(new Date(2023, 9, 1, 7));

    sequelize.addModels([RestaurantModel, ReviewModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });
  it("should delete a restaurant", async () => {
    await RestaurantModel.create({
      id: "1",
      name: "The Big Restaurant",
      phone: "454545222",
      description: "the biggest restaurant you ever seen",
      address: "xxx-yyy",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    const restaurantRepository = new RestaurantRepository();
    let restaurant = await restaurantRepository.findAll();
    const useCase = new DeleteRestaurantUseCase(restaurantRepository);

    expect(restaurant.length).toBe(1);

    const input = {
      id: "1",
    };

    const result = await useCase.execute(input);
    restaurant = await restaurantRepository.findAll();
    expect(restaurant.length).toBe(0);
    expect(result).toStrictEqual({});
  });
});
