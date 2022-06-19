import { Sequelize } from "sequelize-typescript";
import Id from "../../../../@shared/domain/value-object/id.value-object";
import { FindAllCustomerOutputDto } from "./findAll-customer.dto";
import { ReviewModel } from "../../../../review/repository/review.model";
import Customer from "../../../domain/customer.entity";
import { CustomerModel } from "../../../repository/customer.model";
import CustomerRepository from "../../../repository/customer.repository";
import FindAllCustomerUseCase from "./findAll-customer.usecase";

describe("List customer integration test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    jest.useFakeTimers("modern").setSystemTime(new Date(2023, 9, 1, 7));

    await sequelize.addModels([CustomerModel, ReviewModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });
  it("should list customers", async () => {
    const customerRepository = new CustomerRepository();
    const usecase = new FindAllCustomerUseCase(customerRepository);

    const customer = new Customer({
      id: new Id("1"),
      name: "John Doe",
      phone: "322588",
    });

    const customer2 = new Customer({
      id: new Id("2"),
      name: "Maya",
      phone: "5555577",
    });

    const customer3 = new Customer({
      id: new Id("3"),
      name: "Carl Jyr",
      phone: "88855447788",
    });

    await customerRepository.create(customer);
    await customerRepository.create(customer2);
    await customerRepository.create(customer3);

    const customerArray = [customer, customer2, customer3];

    const input = {};

    const output: FindAllCustomerOutputDto = customerArray.map((customer) => {
      return {
        id: customer.id.id,
        name: customer.name,
        phone: customer.phone,
      };
    });

    const result = await usecase.execute(input);

    expect(result).toStrictEqual(output);
  });
});
