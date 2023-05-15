import { Sequelize } from "sequelize-typescript";
import { ReviewModel } from "../../../review/repository/review.model";
import { CustomerModel } from "../../repository/customer.model";
import CustomerRepository from "../../repository/customer.repository";
import DeleteCustomerUseCase from "./delete.customer.usecase";

describe("Delete customer integration test", () => {
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
  it("should delete a customer", async () => {
    await CustomerModel.create({
      id: "1",
      name: "Maya",
      phone: "454545222",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    const customerRepository = new CustomerRepository();
    let customer = await customerRepository.findAll();
    const useCase = new DeleteCustomerUseCase(customerRepository);

    expect(customer.length).toBe(1);

    const input = {
      id: "1",
    };

    const result = await useCase.execute(input);
    customer = await customerRepository.findAll();
    expect(customer.length).toBe(0);
    expect(result).toStrictEqual({});
  });
});
