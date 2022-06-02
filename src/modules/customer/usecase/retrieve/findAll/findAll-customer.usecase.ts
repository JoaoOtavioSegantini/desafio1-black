import Customer from "../../../domain/customer.entity";
import CustomerGateway from "../../../gateway/customer.gateway";
import {
  FindAllCustomerInputDto,
  FindAllCustomerOutputDto,
} from "./findAll-customer.dto";

export default class FindAllCustomerUseCase {
  private customerRepository: CustomerGateway;
  constructor(CustomerRepository: CustomerGateway) {
    this.customerRepository = CustomerRepository;
  }

  async execute(input: FindAllCustomerInputDto): Promise<FindAllCustomerOutputDto> {
    const customers = await this.customerRepository.findAll();
    return OutputMapper.toOutput(customers);
  }
}

class OutputMapper {
  static toOutput(customers: Customer[]): FindAllCustomerOutputDto {
    const output = customers.map((customer) => ({
      id: customer.id.id,
      name: customer.name,
      phone: customer.phone,
    }));

    return output;
  }
}
