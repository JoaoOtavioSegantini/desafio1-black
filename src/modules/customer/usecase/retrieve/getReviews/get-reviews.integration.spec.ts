import { Sequelize } from "sequelize-typescript";
import Id from "../../../../@shared/domain/value-object/id.value-object";
import Review from "../../../../review/domain/review.entity";
import { ReviewModel } from "../../../../review/repository/review.model";
import ReviewRepository from "../../../../review/repository/review.repository";
import Customer from "../../../domain/customer.entity";
import { CustomerModel } from "../../../repository/customer.model";
import CustomerRepository from "../../../repository/customer.repository";
import GetReviewsCustomerUseCase from "./get-reviews-customer.usecase";

describe("Test get reviews customer use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    jest.useFakeTimers("modern").setSystemTime(new Date(2023, 9, 1, 7));

    await sequelize.addModels([CustomerModel, ReviewModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should list customer reviews", async () => {
    const customerRepository = new CustomerRepository();
    const reviewRepository = new ReviewRepository();
    const usecase = new GetReviewsCustomerUseCase(customerRepository);

    const customer = new Customer({
      id: new Id("1"),
      name: "John Doe",
      phone: "322588",
    });

    await customerRepository.create(customer);
    const review = new Review({
      id: new Id("1"),
      clientId: "1",
      comment: "Great!",
      restaurantId: "1",
      stars: 4,
    });
    const review2 = new Review({
      id: new Id("2"),
      clientId: "1",
      comment: "Not so bad...",
      restaurantId: "2",
      stars: 3,
    });

    await reviewRepository.create(review);
    await reviewRepository.create(review2);

    const input = { id: "1" };
    const revArray = [review, review2]
    const output = {
      customerId: "1",
      averageStarsGiven: 3.5,
      reviews: revArray.map(rev => {
        return {
          comment: rev.comment,
          restaurantId: rev.restaurantId,
          stars: rev.stars
        }
      }),
    };

    const result = await usecase.execute(input);

    expect(result).toStrictEqual(output);
  });
});
