import RestaurantGateway from "../../../gateway/restaurant.gateway";
import {
  GetTopFiveInputDto,
  GetTopFiveOutputDto,
} from "./top-five.restaurant.dto";

export default class GetTopFiveRestaurantUseCase {
  constructor(private readonly restaurantRepository: RestaurantGateway) {}

  async execute(input: GetTopFiveInputDto): Promise<GetTopFiveOutputDto> {
    const reviews = await this.restaurantRepository.getTopFive();
    return reviews.map((rev) => {
      return {
        averageReviews: rev.averageReviews,
        id: rev.id,
        name: rev.name,
        reviews: rev.reviews,
      };
    });
  }
}
