import { Sequelize } from "sequelize-typescript";
import { ReviewModel } from "../../../review/repository/review.model";
import { CustomerModel } from "../../repository/customer.model";
import CustomerRepository from "../../repository/customer.repository";
import CreateCustomerUseCase from "./create-customer.usecase";

describe("Create customer integration test", () => {
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
  it("should create a customer", async () => {
    const customerRepository = new CustomerRepository();
    const usecase = new CreateCustomerUseCase(customerRepository);

    const input = {
      name: "Customer 1",
      phone: "15333985-558",
    };

    let customers = await customerRepository.findAll();

    expect(customers.length).toBe(0);

    const result = await usecase.execute(input);
    expect(result.id).toBeDefined();
    expect(result.name).toBe("Customer 1");
    expect(result.phone).toBe("15333985-558");

    customers = await customerRepository.findAll();
    expect(customers.length).toBe(1);
  });
});
