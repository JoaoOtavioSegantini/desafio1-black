import Id from "../../../../@shared/domain/value-object/id.value-object";
import Review from "../../../../review/domain/review.entity";
import Customer from "../../../domain/customer.entity";
import GetReviewsCustomerUseCase from "./get-reviews-customer.usecase";

const customer = new Customer({
  name: "John Doe",
  phone: "xxx",
  id: new Id("1"),
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
  clientId: 1,
  restaurantId: 2,
  stars: 1,
  comment: "Ótimo",
});
const review3 = new Review({
  id: new Id("3"),
  clientId: 1,
  restaurantId: 3,
  stars: 4,
  comment: "Ótimo",
});

const output = {
  customerId: Number(customer.id.id),
  averageStarsGiven: (review.stars + review2.stars + review3.stars) / 3,
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
    const customerRepository = MockRepository();
    const usecase = new GetReviewsCustomerUseCase(customerRepository);

    const input = { id: "1" };

    const result = await usecase.execute(input);

    expect(customerRepository.getReviews).toHaveBeenCalled();
    expect(result.reviews).toHaveLength(3);
    expect(result.averageStarsGiven).toBe(3);
    expect(result.customerId).toBe(1);

  });
});
