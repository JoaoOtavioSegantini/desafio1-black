import Id from "../../../../@shared/domain/value-object/id.value-object";
import Customer from "../../../domain/customer.entity";
import FindAllCustomerUseCase from "./findAll-customer.usecase";

const customer = new Customer({
  name: "John Doe",
  phone: "xxx",
  id: new Id("1"),
});
const customer2 = new Customer({
  name: "Marcela",
  phone: "yyy",
  id: new Id("2"),
});

const MockRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue([customer, customer2]),
    delete: jest.fn(),
    getReviews: jest.fn(),
    update: jest.fn(),
  };
};

describe("List customer usecase unit test", () => {
  it("should find all customers", async () => {
    const customerRepository = MockRepository();
    const usecase = new FindAllCustomerUseCase(customerRepository);

    const input = {};

    const output = [customer, customer2];

    const result = await usecase.execute(input);

    expect(customerRepository.findAll).toHaveBeenCalled();
    expect(result).toHaveLength(2);
    expect(result[0].id).toBe(output[0].id.id);
    expect(result[0].name).toBe(output[0].name);
    expect(result[0].phone).toBe(output[0].phone);
    expect(result[1].id).toBe(output[1].id.id);
    expect(result[1].name).toBe(output[1].name);
    expect(result[1].phone).toBe(output[1].phone);
  });
});
