import Id from "../../../@shared/domain/value-object/id.value-object"
import Customer from "../../domain/customer.entity";
import CustomerGateway from "../../gateway/customer.gateway";
import {
  CreateCustomerInputDto,
  CreateCustomerOutputDto,
} from "./create-customer.dto";

export default class CreateCustomerUseCase {
  private _customerRepository: CustomerGateway;

  constructor(_customerRepository: CustomerGateway) {
    this._customerRepository = _customerRepository;
  }
  async execute(
    input: CreateCustomerInputDto
  ): Promise<CreateCustomerOutputDto> {
    const props = {
      id: new Id(input.id),
      name: input.name,
      phone: input.phone,
    };
    const customer = new Customer(props);
    this._customerRepository.create(customer);

    return {
      id: customer.id.id,
      name: customer.name,
      phone: customer.phone,
    };
  }
}
