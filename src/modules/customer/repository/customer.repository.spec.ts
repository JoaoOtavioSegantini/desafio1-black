import { Sequelize } from "sequelize-typescript";
import Id from "../../@shared/domain/value-object/id.value-object";
import { ReviewModel } from "../../review/repository/review.model";
import Customer from "../domain/customer.entity";
import { CustomerModel } from "./customer.model";
import CustomerRepository from "./customer.repository";

describe("Customer repository test", () => {
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

  it("should create a new customer", async () => {
    const props = { id: new Id("1"), name: "Customer 10", phone: "56568880" };
    const customer = new Customer(props);
    const customerRepostory = new CustomerRepository();

    await customerRepostory.create(customer);

    const customerDb = await CustomerModel.findOne({
      where: { id: props.id.id },
    });

    expect(props.id.id).toBe(customerDb.id);
    expect(props.name).toBe(customerDb.name);
    expect(props.phone).toBe(customerDb.phone);
  });
  it("should find a customer", async () => {
    CustomerModel.create({
      id: "1",
      name: "Customer 1",
      phone: "35 36585",
      updatedAt: new Date(),
      createdAt: new Date(),
    });
    const customerRepostory = new CustomerRepository();

    const customer = await customerRepostory.find("1");

    expect(customer.id.id).toEqual("1");
    expect(customer.name).toEqual("Customer 1");
    expect(customer.phone).toEqual("35 36585");
  });

  it("should update a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer({
      id: new Id("123"),
      name: "Customer 1",
      phone: "xxx",
    });
    await customerRepository.create(customer);

    customer.changeName("Customer updated");
    customer.changePhone("phone updated");

    await customerRepository.update(customer);
    const updatedCustomer = await CustomerModel.findOne({
      where: { id: "123" },
    });

    expect(updatedCustomer.toJSON()).toStrictEqual({
      id: "123",
      name: "Customer updated",
      phone: "phone updated",
      createdAt: customer.createdAt,
      updatedAt: customer.updatedAt,
      numberOfReviews: null,
    });
  });
  it("should find all customers", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer({
      id: new Id("1"),
      name: "Customer 1",
      phone: "xxx",
    });
    const customer2 = new Customer({
      id: new Id("2"),
      name: "Customer 2",
      phone: "yyy",
    });
    await customerRepository.create(customer);
    await customerRepository.create(customer2);

    const allCustomers = await CustomerModel.findAll();

    expect(allCustomers).toHaveLength(2);
    expect(allCustomers[0].id).toEqual(customer.id.id);
    expect(allCustomers[0].name).toEqual(customer.name);
    expect(allCustomers[0].phone).toEqual(customer.phone);
    expect(allCustomers[1].id).toStrictEqual(customer2.id.id);
    expect(allCustomers[1].name).toEqual(customer2.name);
    expect(allCustomers[1].phone).toEqual(customer2.phone);
  });
  it("should delete a customer", async () => {
    const props = { id: new Id("1"), name: "Customer 10", phone: "56568880" };
    const customer = new Customer(props);
    const customerRepostory = new CustomerRepository();

    await customerRepostory.create(customer);

    const customerDb = await CustomerModel.findOne({
      where: { id: props.id.id },
    });

    expect(props.id.id).toBe(customerDb.id);
    expect(props.name).toBe(customerDb.name);
    expect(props.phone).toBe(customerDb.phone);

    await CustomerModel.destroy({ where: { id: props.id.id } });

    const customerDeleted = await CustomerModel.findOne({
      where: { id: props.id.id },
    });

    expect(customerDeleted).toBeNull();
  });
});
