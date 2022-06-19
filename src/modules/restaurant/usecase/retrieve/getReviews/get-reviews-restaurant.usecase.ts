import RestaurantGateway from "../../../gateway/restaurant.gateway";
import {
  GetReviewsRestaurantInputDto,
  GetReviewsRestaurantOutputDto,
} from "./get-reviews-restaurant.dto";

export default class GetReviewsRestaurantUseCase {
  constructor(private readonly restaurantRepository: RestaurantGateway) {}

  async execute(
    input: GetReviewsRestaurantInputDto
  ): Promise<GetReviewsRestaurantOutputDto> {
    const reviews = await this.restaurantRepository.getReviews(input.id);
    return reviews;
  }
}
