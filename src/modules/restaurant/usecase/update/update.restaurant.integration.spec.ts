import { Sequelize } from "sequelize-typescript";
import Id from "../../../@shared/domain/value-object/id.value-object";
import { ReviewModel } from "../../../review/repository/review.model";
import Restaurant from "../../domain/restaurant.entity";
import { RestaurantModel } from "../../repository/restaurant.model";
import RestaurantRepository from "../../repository/restaurant.repository";
import UpdateRestaurantUseCase from "./update-restaurant.usecase";

describe("Update restaurant integration test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    jest.useFakeTimers("modern").setSystemTime(new Date(2023, 9, 1, 7));

    await sequelize.addModels([RestaurantModel, ReviewModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });
  it("should update a restaurant", async () => {
    const restaurantRepository = new RestaurantRepository();
    const usecase = new UpdateRestaurantUseCase(restaurantRepository);

    const restaurant = new Restaurant({
      id: new Id("1"),
      name: "Restaurant 3",
      phone: "9997522",
      description: "a simple tailand restaurant",
      address: "xxx-+595959",
    });

    await restaurantRepository.create(restaurant);

    const input = {
      id: "1",
      name: "The pacific",
      description: "The biggest pacific restaurant",
      phone: "xxxx",
      address: "street number one, district zero",
    };

    const output = {
      id: "1",
      name: "The pacific",
      description: "The biggest pacific restaurant",
      phone: "xxxx",
      address: "street number one, district zero",
    };

    const result = await usecase.execute(input);

    expect(result).toStrictEqual(output);
  });
});
