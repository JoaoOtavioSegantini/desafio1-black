import { Sequelize } from "sequelize-typescript";
import Id from "../../../../@shared/domain/value-object/id.value-object";
import Customer from "../../../../customer/domain/customer.entity";
import { CustomerModel } from "../../../../customer/repository/customer.model";
import CustomerRepository from "../../../../customer/repository/customer.repository";
import Review from "../../../../review/domain/review.entity";
import { ReviewModel } from "../../../../review/repository/review.model";
import ReviewRepository from "../../../../review/repository/review.repository";
import Restaurant from "../../../domain/restaurant.entity";
import { RestaurantModel } from "../../../repository/restaurant.model";
import RestaurantRepository from "../../../repository/restaurant.repository";
import { GetReviewsRestaurantOutputDto } from "./get-reviews-restaurant.dto";
import GetReviewsRestaurantUseCase from "./get-reviews-restaurant.usecase";

describe("Test get reviews restaurant use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    jest.useFakeTimers("modern").setSystemTime(new Date(2023, 9, 1, 7));

    sequelize.addModels([RestaurantModel, ReviewModel, CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should list restaurant reviews", async () => {
    const restaurantRepository = new RestaurantRepository();
    const customerRepository = new CustomerRepository();
    const reviewRepository = new ReviewRepository();
    const usecase = new GetReviewsRestaurantUseCase(restaurantRepository);

    const customer = new Customer({
      id: new Id("1"),
      name: "John Doe",
      phone: "322588",
    });

    const customer2 = new Customer({
      id: new Id("2"),
      name: "Maryln Dansey",
      phone: "664466",
    });

    const restaurant = new Restaurant({
      id: new Id("1"),
      address: "xxx",
      description: "a simple description",
      name: "Swx restaurant",
      phone: "5656",
    });

    await customerRepository.create(customer);
    await customerRepository.create(customer2);
    await restaurantRepository.create(restaurant);
    const review = new Review({
      id: new Id("1"),
      clientId: "1",
      comment: "Great!",
      restaurantId: "1",
      stars: 5,
    });
    const review2 = new Review({
      id: new Id("2"),
      clientId: "2",
      comment: "Not so bad...",
      restaurantId: "1",
      stars: 3,
    });

    await reviewRepository.create(review);
    await reviewRepository.create(review2);

    const input = { id: "1" };
    const revArray = [review, review2]

    const output: GetReviewsRestaurantOutputDto = {
      restaurantId: "1",
      averageStarsReceived: 4,
      reviews: revArray.map(rev => {
        return {
          customerId: rev.clientId,
          comment: rev.comment,
          stars: rev.stars
        }
      }),
    };

    const result = await usecase.execute(input);

    expect(result).toStrictEqual(output);
  });
});
