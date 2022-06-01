import CreateCustomerUseCase from "./create-customer.usecase";

const MockRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn(),
    delete: jest.fn(),
    getReviews: jest.fn(),
    update: jest.fn()
  };
};

describe("Create customer usecase unit test", () => {
  it("should add a new customer", async () => {
    const customerRepository = MockRepository();
    const usecase = new CreateCustomerUseCase(customerRepository);

    const input = {
      name: "Customer 1",
      phone: "15333985-558",
    };

    const result = await usecase.execute(input);

    expect(customerRepository.create).toHaveBeenCalled();
    expect(result.id).toBeDefined;
    expect(result.name).toBe(input.name);
    expect(result.phone).toBe(input.phone);
  });
});
