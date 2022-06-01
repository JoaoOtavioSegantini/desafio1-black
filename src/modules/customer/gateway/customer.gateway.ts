import Customer from "../domain/customer.entity";

export default interface CustomerGateway {
  create(customer: Customer): Promise<Customer>;
  find(id: string): Promise<Customer>;
  findAll(): Promise<Customer[]>;
  update(entity: Customer): Promise<void>;
  delete(id: string): Promise<void>;
  getReviews(id: string): any;
}
