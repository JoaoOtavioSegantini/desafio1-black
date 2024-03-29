import { Sequelize } from "sequelize-typescript";
import Id from "../../../../@shared/domain/value-object/id.value-object";
import { ReviewModel } from "../../../../review/repository/review.model";
import Customer from "../../../domain/customer.entity";
import { CustomerModel } from "../../../repository/customer.model";
import CustomerRepository from "../../../repository/customer.repository";
import FindCustomerUseCase from "./find-customer.usecase";

describe("Test: find customer integration test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    jest.useFakeTimers("modern").setSystemTime(new Date(2023, 9, 1, 7));

    sequelize.addModels([CustomerModel, ReviewModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });
  it("should find a customer", async () => {
    const customerRepository = new CustomerRepository();
    const usecase = new FindCustomerUseCase(customerRepository);

    const customer = new Customer({
      id: new Id("1"),
      name: "John Doe",
      phone: "322588",
    });

    await customerRepository.create(customer);

    const input = { id: "1" };

    const output = {
      id: "1",
      name: "John Doe",
      phone: "322588",
    };

    const result = await usecase.execute(input);

    expect(result).toStrictEqual(output);
  });
});
