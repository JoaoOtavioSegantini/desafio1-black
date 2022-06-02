import Id from "../../../../@shared/domain/value-object/id.value-object";
import Customer from "../../../domain/customer.entity";
import FindCustomerUseCase from "./find-customer.usecase";

const customer = new Customer({ name: "John", phone: "xxx", id: new Id("123") });


const MockRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn().mockReturnValue(customer),
    findAll: jest.fn(),
    delete: jest.fn(),
    getReviews: jest.fn(),
    update: jest.fn(),
  };
};


describe("Find customer usecase unit test", () => {
  it("should find a customer", async () => {
    const customerRepository = MockRepository();
    const usecase = new FindCustomerUseCase(customerRepository);

    const input = {
      id: "123",
    };

    const output = {
      id: "123",
      name: "John",
      phone: "xxx",
    };

    const result = await usecase.execute(input);

    expect(customerRepository.find).toHaveBeenCalled();
    expect(result.id).toBeDefined;
    expect(result.name).toBe(output.name);
    expect(result.phone).toBe(output.phone);
  });
});
