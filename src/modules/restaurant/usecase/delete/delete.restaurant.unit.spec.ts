import Id from "../../../@shared/domain/value-object/id.value-object";
import Restaurant from "../../domain/restaurant.entity";
import DeleteCustomerUseCase from "./delete.restaurant.usecase";

const restaurant = new Restaurant({
  id: new Id("4455"),
  name: "restaurant 1",
  phone: "332255",
  address: "xxx",
  description: "a simple restaurant"
});
const input = {
  id: restaurant.id.id,
};

const MockRepository = () => {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
    delete: jest.fn().mockReturnValue(Promise.resolve()),
    getReviews: jest.fn(),
  };
};

describe("Unit test for restaurant delete use case", () => {
  it("should delete a restaurant", async () => {
    const restaurantRepository = MockRepository();
    const customerUpdateUseCase = new DeleteCustomerUseCase(restaurantRepository);

    const output = await customerUpdateUseCase.execute(input);

    expect(output).toEqual({});
  });
});
