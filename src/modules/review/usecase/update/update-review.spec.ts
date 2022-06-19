import Id from "../../../@shared/domain/value-object/id.value-object";
import Review from "../../domain/review.entity";
import UpdateReviewUseCase from "./update-review.usecase";

const review = new Review({
  id: new Id("1"),
  clientId: "2",
  restaurantId: "1",
  stars: 1,
  comment: "Ótimo",
});

const input = {
  id: "1",
  clientId: "2",
  restaurantId: "1",
  stars: 4,
  comment: "Ótimo!! :)",
};

const MockRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(review)),
    findAll: jest.fn(),
    delete: jest.fn(),
    getReviews: jest.fn(),
    update: jest.fn(),
  };
};

describe("Update review usecase unit test", () => {
  it("should update a review", async () => {
    const reviewRepository = MockRepository();
    const usecase = new UpdateReviewUseCase(reviewRepository);

    const result = await usecase.execute(input);

    expect(reviewRepository.update).toHaveBeenCalled();
    expect(result).toEqual({});
  });
});
