import { Sequelize } from "sequelize-typescript";
import Id from "../../../../@shared/domain/value-object/id.value-object";
import { ReviewModel } from "../../../../review/repository/review.model";
import Restaurant from "../../../domain/restaurant.entity";
import { RestaurantModel } from "../../../repository/restaurant.model";
import RestaurantRepository from "../../../repository/restaurant.repository";
import FindRestaurantUseCase from "./find-restaurant.usecase";

describe("Test: find restaurant integration test", () => {
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
  it("should find a restaurant", async () => {
    const restaurantRepository = new RestaurantRepository();
    const usecase = new FindRestaurantUseCase(restaurantRepository);

    const restaurant = new Restaurant({
      id: new Id("1"),
      name: "The big",
      phone: "322588",
      description: "the biggest restaurant you ever seen",
      address: "xxx-yyy",
    });

    await restaurantRepository.create(restaurant);

    const input = { id: "1" };

    const output = {
      id: "1",
      name: "The big",
      phone: "322588",
      description: "the biggest restaurant you ever seen",
      address: "xxx-yyy",
    };

    const result = await usecase.execute(input);

    expect(result).toStrictEqual(output);
  });
});
