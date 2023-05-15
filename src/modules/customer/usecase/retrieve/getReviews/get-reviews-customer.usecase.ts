import CustomerGateway from "../../../gateway/customer.gateway";
import { GetReviewsCustomerInputDto, GetReviewsCustomerOutputDto } from "./get-reviews-customer.dto";


export default class GetReviewsCustomerUseCase {
  private customerRepository: CustomerGateway;
  constructor(CustomerRepository: CustomerGateway) {
    this.customerRepository = CustomerRepository;
  }

  async execute(input: GetReviewsCustomerInputDto): Promise<GetReviewsCustomerOutputDto> {
    return await this.customerRepository.getReviews(input.id);
  }
}
