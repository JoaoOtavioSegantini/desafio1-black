import RestaurantGateway from "../../../gateway/restaurant.gateway";
import {
  FindRestaurantInputDto,
  FindRestaurantOutputDto,
} from "./find-restaurant.dto";

export default class FindCustomerUseCase {
  constructor(private readonly restaurantRepository: RestaurantGateway) {}

  async execute(
    input: FindRestaurantInputDto
  ): Promise<FindRestaurantOutputDto> {
    const restaurant = await this.restaurantRepository.find(input.id);

    return {
      id: restaurant.id.id,
      name: restaurant.name,
      address: restaurant.address,
      phone: restaurant.phone,
      description: restaurant.description,
    };
  }
}
