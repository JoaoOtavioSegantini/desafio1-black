import Id from "../../@shared/domain/value-object/id.value-object";
import Review from "../../review/domain/review.entity";
import { ReviewModel } from "../../review/repository/review.model";
import Customer from "../domain/customer.entity";
import CustomerGateway from "../gateway/customer.gateway";
import { CustomerModel } from "./customer.model";

export default class CustomerRepository implements CustomerGateway {
  async create(customer: Customer): Promise<Customer> {
    const customerModel = await CustomerModel.create({
      id: customer.id.id,
      phone: customer.phone,
      name: customer.name,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return new Customer({
      id: new Id(customerModel.id),
      phone: customerModel.phone,
      name: customerModel.name,
    });
  }
  async find(id: string): Promise<Customer> {
    const customer = await CustomerModel.findOne({ where: { id } });

    if (!customer) {
      throw new Error("Customer not found");
    }

    return new Customer({
      id: new Id(customer.id),
      name: customer.name,
      phone: customer.phone,
    });
  }
  async findAll(): Promise<Customer[]> {
    const models = await CustomerModel.findAll();

    let customers: Customer[] = [];
    models.forEach((model) => {
      const customer = new Customer({
        id: new Id(model.id),
        name: model.name,
        phone: model.phone,
      });
      customers.push(customer);
    });

    return customers;
  }
  async update(entity: Customer): Promise<void> {
    await CustomerModel.update(
      { name: entity.name, phone: entity.phone },
      { where: { id: entity.id.id } }
    );
  }
  async delete(id: string): Promise<void> {
    const customer = await CustomerModel.findOne({ where: { id } });

    if (!customer) {
      return;
    }

    await CustomerModel.destroy({ where: { id } });
  }
  async getReviews(id: string) {
    const customer = await CustomerModel.findOne({
      where: { id },
      include: [{ model: ReviewModel }],
    });

    let reviews: Review[] = [];
    let starsGiven: number = 0;

    customer.reviews.forEach((rev) => {
      const review = new Review({
        id: new Id(rev.id),
        clientId: rev.clientId,
        comment: rev.comment,
        restaurantId: rev.restaurantId,
        stars: rev.stars,
      });
      reviews.push(review);
      starsGiven += review.stars;
    });

    const response = {
      customerId: id,
      averageStarsGiven: starsGiven / reviews.length,
      reviews: reviews.map(rev => {
        return {
          restaurantId: rev.restaurantId,
          stars: rev.stars,
          comment: rev.comment
        }
      }),
    };

    return response;
  }
}
