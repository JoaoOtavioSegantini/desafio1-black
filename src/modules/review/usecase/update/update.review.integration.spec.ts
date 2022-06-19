import { Sequelize } from "sequelize-typescript";
import Id from "../../../@shared/domain/value-object/id.value-object";
import Review from "../../domain/review.entity";
import { ReviewModel } from "../../repository/review.model";
import ReviewRepository from "../../repository/review.repository";
import UpdateReviewUseCase from "./update-review.usecase";

describe("Update review integration test", () => {
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
  it("should update a review", async () => {
    const reviewRepository = new ReviewRepository();
    const usecase = new UpdateReviewUseCase(reviewRepository);

    const review = new Review({
      id: new Id("1"),
      clientId: "1",
      restaurantId: "1",
      stars: 4,
      comment: "Fantastic",
    });

    await reviewRepository.create(review);

    const input = {
      id: "1",
      clientId: "8",
      restaurantId: "6",
      stars: 3,
      comment: "Not so bad...",
    };

    const output = {};

    const result = await usecase.execute(input);

    expect(result).toStrictEqual(output);

    const newreview = await reviewRepository.find("1");
    expect(newreview.id.id).toBe("1");
    expect(newreview.comment).toBe(input.comment);
    expect(newreview.clientId).toBe(input.clientId);
    expect(newreview.restaurantId).toBe(input.restaurantId);
    expect(newreview.stars).toBe(input.stars);

  });
});
