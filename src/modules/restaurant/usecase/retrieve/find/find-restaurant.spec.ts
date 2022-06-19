import Id from "../../../../@shared/domain/value-object/id.value-object";
import Restaurant from "../../../domain/restaurant.entity";
import FindRestaurantUseCase from "./find-restaurant.usecase";

const restaurant = new Restaurant({
  name: "Restaurant 1",
  address: "xxx",
  description: "a simple restaurant",
  phone: "xxx",
  id: new Id("123"),
});

const MockRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn().mockReturnValue(restaurant),
    findAll: jest.fn(),
    delete: jest.fn(),
    getReviews: jest.fn(),
    update: jest.fn(),
    getTopFive: jest.fn()
  };
};

describe("Find restaurant usecase unit test", () => {
  it("should find a restaurant", async () => {
    const restaurantRepository = MockRepository();
    const usecase = new FindRestaurantUseCase(restaurantRepository);

    const input = {
      id: "123",
    };

    const output = {
      id: "123",
      name: "Restaurant 1",
      address: "xxx",
      description: "a simple restaurant",
      phone: "xxx",
    };

    const result = await usecase.execute(input);

    expect(restaurantRepository.find).toHaveBeenCalled();
    expect(result).toEqual(output)
  });
});
