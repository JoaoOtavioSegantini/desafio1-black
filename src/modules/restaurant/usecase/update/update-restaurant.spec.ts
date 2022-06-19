import Id from "../../../@shared/domain/value-object/id.value-object";
import Restaurant from "../../domain/restaurant.entity";
import UpdateRestaurantUseCase from "./update-restaurant.usecase";

const restaurant = new Restaurant({
  id: new Id("1"),
  name: "restaurant 1",
  phone: "15333985-558",
  description: "A simple restaurant with fast food",
  address: "Av 111, Londres , State Y",
});

const input = {
  id: restaurant.id.id,
  name: "restaurant Updated",
  phone: "Phone updated",
  description: "Description updated",
  address: "address updated"
};

const MockRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(restaurant)),
    findAll: jest.fn(),
    delete: jest.fn(),
    getReviews: jest.fn(),
    createReview: jest.fn(),
    putReview: jest.fn(),
    update: jest.fn(),
    getTopFive: jest.fn()
  };
};

describe("Update restaurant usecase unit test", () => {
  it("should update a customer", async () => {
    const restaurantRepository = MockRepository();
    const usecase = new UpdateRestaurantUseCase(restaurantRepository);

    const result = await usecase.execute(input);

    expect(result).toEqual(input);
  });
});
