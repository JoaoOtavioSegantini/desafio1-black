import { Sequelize } from "sequelize-typescript";
import { ReviewModel } from "../../repository/review.model";
import ReviewRepository from "../../repository/review.repository";
import CreateReviewUseCase from "./create-review.usecase";

describe("Create review integration test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    jest.useFakeTimers("modern").setSystemTime(new Date(2023, 9, 1, 7));

    await sequelize.addModels([ReviewModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });
  it("should create a review", async () => {
    const reviewRepository = new ReviewRepository();
    const usecase = new CreateReviewUseCase(reviewRepository);

    const input = {
      clientId: "1",
      restaurantId: "1",
      stars: 4,
      comment: "Fantastic"
    };

    let reviews = await reviewRepository.findAll();

    expect(reviews.length).toBe(0);

    const result = await usecase.execute(input);
    expect(result.id).toBeDefined();
    expect(result.clientId).toBe("1");
    expect(result.restaurantId).toBe("1");
    expect(result.stars).toBe(4);
    expect(result.comment).toBe("Fantastic");

    reviews = await reviewRepository.findAll();
    expect(reviews.length).toBe(1);
  });
});
