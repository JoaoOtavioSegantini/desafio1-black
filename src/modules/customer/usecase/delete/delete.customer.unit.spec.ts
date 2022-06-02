import Id from "../../../@shared/domain/value-object/id.value-object";
import Customer from "../../domain/customer.entity";
import DeleteCustomerUseCase from "./delete.customer.usecase";

const customer = new Customer({
  id: new Id("4455"),
  name: "John",
  phone: "332255",
});
const input = {
  id: customer.id.id,
};

const MockRepository = () => {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
    delete: jest.fn().mockReturnValue(Promise.resolve()),
    getReviews: jest.fn(),
  };
};

describe("Unit test for customer delete use case", () => {
  it("should delete a customer", async () => {
    const customerRepository = MockRepository();
    const customerUpdateUseCase = new DeleteCustomerUseCase(customerRepository);

    const output = await customerUpdateUseCase.execute(input);

    expect(output).toEqual({});
  });
});
