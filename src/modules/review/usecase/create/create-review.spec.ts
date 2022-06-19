import CreateReviewUseCase from "./create-review.usecase";

const MockRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn(),
    delete: jest.fn(),
    getReviews: jest.fn(),
    update: jest.fn(),
  };
};

describe("Create review usecase unit test", () => {
  it("should add a new review", async () => {
    const reviewRepository = MockRepository();
    const usecase = new CreateReviewUseCase(reviewRepository);

    const input = {
      clientId: "2",
      restaurantId: "1",
      stars: 1,
      comment: "Péssimo...",
    };

    const result = await usecase.execute(input);

    expect(reviewRepository.create).toHaveBeenCalled();
    expect(result.id).toBeDefined();
    expect(result.clientId).toBe(input.clientId);
    expect(result.restaurantId).toBe(input.restaurantId);
    expect(result.stars).toBe(input.stars);
    expect(result.comment).toBe(input.comment);
  });
});
