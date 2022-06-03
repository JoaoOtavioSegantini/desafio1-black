import CustomerGateway from "../../gateway/customer.gateway";
import {
  InputUpdateCustomerDto,
  OutputUpdateCustomerDto,
} from "./update.customer.dto";

export default class UpdateCustomerUseCase {
  private CustomerRepository: CustomerGateway;
  constructor(CustomerRepository: CustomerGateway) {
    this.CustomerRepository = CustomerRepository;
  }

  async execute(
    input: InputUpdateCustomerDto
  ): Promise<OutputUpdateCustomerDto> {
    const customer = await this.CustomerRepository.find(input.id);
    customer.changeName(input.name);
    customer.changePhone(input.phone);
    await this.CustomerRepository.update(customer);

    return {
      id: customer.id.id,
      name: customer.name,
      phone: customer.phone,
    };
  }
}
