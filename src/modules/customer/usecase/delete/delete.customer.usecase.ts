import CustomerGateway from "../../gateway/customer.gateway";
import {
  InputDeleteCustomerDto,
  OutputDeleteCustomerDto,
} from "./delete.customer.dto";

export default class DeleteCustomerUseCase {
  private CustomerRepository: CustomerGateway;
  constructor(CustomerRepository: CustomerGateway) {
    this.CustomerRepository = CustomerRepository;
  }

  async execute(
    input: InputDeleteCustomerDto
  ): Promise<OutputDeleteCustomerDto> {
    await this.CustomerRepository.delete(input.id);

    return {};
  }
}
