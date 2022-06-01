import CreateRestaurantUseCase from "./create-restaurant.usecase";

const MockRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn(),
    delete: jest.fn(),
    getReviews: jest.fn(),
    createReview: jest.fn(),
    putReview: jest.fn(),
    update: jest.fn()
  };
};

describe("Create restaurant usecase unit test", () => {
  it("should add a new customer", async () => {
    const restaurantRepository = MockRepository();
    const usecase = new CreateRestaurantUseCase(restaurantRepository);

    const input = {
      name: "restaurant 1",
      phone: "15333985-558",
      description: "A simple restaurant with fast food",
      address: "Av 111, Londres , State Y"
    };

    const result = await usecase.execute(input);

    expect(restaurantRepository.create).toHaveBeenCalled();
    expect(result.id).toBeDefined;
    expect(result.name).toBe(input.name);
    expect(result.phone).toBe(input.phone);
    expect(result.description).toBe(input.description);
    expect(result.address).toBe(input.address);
  });
});
