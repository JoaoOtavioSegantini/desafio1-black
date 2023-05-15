import Restaurant from "../../../domain/restaurant.entity";
import RestaurantGateway from "../../../gateway/restaurant.gateway";
import {
  FindAllRestaurantInputDto,
  FindAllRestaurantOutputDto,
} from "./findAll-restaurant.dto";

export default class FindAllRestaurantUseCase {
  constructor(private readonly restaurantRepository: RestaurantGateway) {}

  async execute(
    input: FindAllRestaurantInputDto
  ): Promise<FindAllRestaurantOutputDto> {
    const restaurants = await this.restaurantRepository.findAll();
    return OutputMapper.toOutput(restaurants);
  }
}

class OutputMapper {
  static toOutput(restaurants: Restaurant[]): FindAllRestaurantOutputDto {
    return restaurants.map((restaurant) => ({
      id: restaurant.id.id,
      name: restaurant.name,
      description: restaurant.description,
      phone: restaurant.phone,
      address: restaurant.address,
    }));
  }
}
