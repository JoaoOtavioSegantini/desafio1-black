import Id from "../../../../@shared/domain/value-object/id.value-object";
import Restaurant from "../../../domain/restaurant.entity";
import FindAllRestaurantUseCase from "./findAll-restaurant.usecase";

const restaurant = new Restaurant({
  name: "Restaurant 1",
  phone: "xxx",
  address: "xxx",
  description: "description a",
  id: new Id("1"),
});
const restaurant2 = new Restaurant({
  name: "Restaurant 2",
  phone: "yyy",
  address: "yyy",
  description: "description b",
  id: new Id("2"),
});

const MockRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue([restaurant, restaurant2]),
    delete: jest.fn(),
    getReviews: jest.fn(),
    update: jest.fn(),
    getTopFive: jest.fn()
  };
};

describe("List restaurant usecase unit test", () => {
  it("should find all restaurants", async () => {
    const customerRepository = MockRepository();
    const usecase = new FindAllRestaurantUseCase(customerRepository);

    const input = {};

    const output = [restaurant, restaurant2];

    const result = await usecase.execute(input);

    expect(customerRepository.findAll).toHaveBeenCalled();
    expect(result).toHaveLength(2);
    expect(result[0].id).toBe(output[0].id.id);
    expect(result[0].name).toBe(output[0].name);
    expect(result[0].phone).toBe(output[0].phone);
    expect(result[1].id).toBe(output[1].id.id);
    expect(result[1].name).toBe(output[1].name);
    expect(result[1].phone).toBe(output[1].phone);
  });
});
