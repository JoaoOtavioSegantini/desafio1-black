import Id from "../../../../@shared/domain/value-object/id.value-object";
import CustomerGateway from "../../../gateway/customer.gateway";
import {
  FindCustomerInputDto,
  FindCustomerOutputDto,
} from "./find-customer.dto";

export default class FindCustomerUseCase {
  private _customerRepository: CustomerGateway;

  constructor(_customerRepository: CustomerGateway) {
    this._customerRepository = _customerRepository;
  }
  async execute(input: FindCustomerInputDto): Promise<FindCustomerOutputDto> {
    const customer = await this._customerRepository.find(input.id);

    return {
      id: customer.id.id,
      name: customer.name,
      phone: customer.phone,
    };
  }
}
