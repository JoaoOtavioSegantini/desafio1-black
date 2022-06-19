import { Sequelize } from "sequelize-typescript";
import Id from "../../../../@shared/domain/value-object/id.value-object";
import { ReviewModel } from "../../../../review/repository/review.model";
import Restaurant from "../../../domain/restaurant.entity";
import { RestaurantModel } from "../../../repository/restaurant.model";
import RestaurantRepository from "../../../repository/restaurant.repository";
import { FindAllRestaurantOutputDto } from "./findAll-restaurant.dto";
import FindAllRestaurantUseCase from "./findAll-restaurant.usecase";

describe("List restaurant integration test", () => {
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
  it("should list restaurants", async () => {
    const restaurantRepository = new RestaurantRepository();
    const usecase = new FindAllRestaurantUseCase(restaurantRepository);

    const restaurant = new Restaurant({
      id: new Id("1"),
      name: "Restaurant 1",
      phone: "322588",
      description: "a simple restaurant",
      address: "xxx-yyy"
    });

    const restaurant2 = new Restaurant({
      id: new Id("2"),
      name: "Restaurant 2",
      phone: "4949222",
      description: "a simple fish restaurant",
      address: "454545-yyy"
    });

    const restaurant3 = new Restaurant({
      id: new Id("3"),
      name: "Restaurant 3",
      phone: "9997522",
      description: "a simple tailand restaurant",
      address: "xxx-+595959"
    });

    await restaurantRepository.create(restaurant);
    await restaurantRepository.create(restaurant2);
    await restaurantRepository.create(restaurant3);

    const restArray = [restaurant, restaurant2, restaurant3];

    const input = {};

    const output: FindAllRestaurantOutputDto = restArray.map((res) => {
      return {
        id: res.id.id,
        name: res.name,
        phone: res.phone,
        description: res.description,
        address: res.address
      };
    });

    const result = await usecase.execute(input);

    expect(result).toStrictEqual(output);
  });
});
