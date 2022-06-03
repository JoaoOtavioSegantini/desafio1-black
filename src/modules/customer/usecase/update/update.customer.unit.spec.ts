import Id from "../../../@shared/domain/value-object/id.value-object";
import Customer from "../../domain/customer.entity";
import UpdateCustomerUseCase from "./update.customer.usecase";

const customer = new Customer({ id: new Id("4455"), name: "John", phone: "332255" });
const input = {
  id: customer.id.id,
  name: "John Updated",
  phone: "Phone updated",
};

const MockRepository = () => {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    update: jest.fn(),
    delete: jest.fn(),
    getReviews: jest.fn(),
  };
};

describe("Unit test for customer update use case", () => {
  it("should update a customer", async () => {
    const customerRepository = MockRepository();
    const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository);

    const output = await customerUpdateUseCase.execute(input);

    expect(output).toEqual(input);
  });
});
