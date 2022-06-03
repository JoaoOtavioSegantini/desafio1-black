import Id from "../../../../@shared/domain/value-object/id.value-object";
import Customer from "../../../../customer/domain/customer.entity";
import Review from "../../../../review/domain/review.entity";
import Restaurant from "../../../domain/restaurant.entity";
import GetReviewsRestaurantUseCase from "./get-reviews-restaurant.usecase";

const customer = new Customer({
  name: "John Doe",
  phone: "xxx",
  id: new Id("1"),
});
const customer2 = new Customer({
  name: "Jessica",
  phone: "xxx",
  id: new Id("2"),
});
const customer3 = new Customer({
  name: "Marisa",
  phone: "xxx",
  id: new Id("3"),
});

const restaurant = new Restaurant({
  id: new Id("1"),
  name: "Restaurant 1",
  phone: "151515",
  address: "xxx",
  description: "a simple restaurant",
});

const review = new Review({
  id: new Id("1"),
  clientId: 1,
  restaurantId: 1,
  stars: 4,
  comment: "cc",
});
const review2 = new Review({
  id: new Id("2"),
  clientId: 2,
  restaurantId: 1,
  stars: 1,
  comment: "Ótimo",
});
const review3 = new Review({
  id: new Id("3"),
  clientId: 3,
  restaurantId: 1,
  stars: 4,
  comment: "Ótimo",
});

const output = {
  restaurantId: Number(restaurant.id.id),
  averageStarsReceived: (review.stars + review2.stars + review3.stars) / 3,
  reviews: [review, review2, review3],
};

const MockRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn(),
    delete: jest.fn(),
    getReviews: jest.fn().mockReturnValue(output),
    update: jest.fn(),
  };
};

describe("Get Reviews customer usecase unit test", () => {
  it("should get customer reviews", async () => {
    const restaurantRepository = MockRepository();
    const usecase = new GetReviewsRestaurantUseCase(restaurantRepository);

    const input = { id: "1" };

    const result = await usecase.execute(input);

    expect(restaurantRepository.getReviews).toHaveBeenCalled();
    expect(result.reviews).toHaveLength(3);
    expect(result.averageStarsReceived).toBe(3);
    expect(result.restaurantId).toBe(1);
  });
});
