import RestaurantGateway from "../../../gateway/restaurant.gateway";
import {
  GetReviewsRestaurantInputDto,
  GetReviewsRestaurantOutputDto,
} from "./get-reviews-restaurant.dto";

export default class GetReviewsRestaurantUseCase {
  private restaurantRepository: RestaurantGateway;
  constructor(restaurantRepository: RestaurantGateway) {
    this.restaurantRepository = restaurantRepository;
  }

  async execute(
    input: GetReviewsRestaurantInputDto
  ): Promise<GetReviewsRestaurantOutputDto> {
    const reviews = await this.restaurantRepository.getReviews(input.id);
    return reviews;
  }
}
