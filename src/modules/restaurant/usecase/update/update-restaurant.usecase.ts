import RestaurantGateway from "../../gateway/restaurant.gateway";
import {
  UpdateRestaurantInputDto,
  UpdateRestaurantOutputDto,
} from "./update-restaurant.dto";

export default class UpdateRestaurantUseCase {
  constructor(private readonly _restaurantRepository: RestaurantGateway) {}
  
  async execute(
    input: UpdateRestaurantInputDto
  ): Promise<UpdateRestaurantOutputDto> {
    const restaurant = await this._restaurantRepository.find(input.id);
    restaurant.changeName(input.name);
    restaurant.changePhone(input.phone);
    restaurant.changeDescription(input.description);
    restaurant.changeAddress(input.address);
    await this._restaurantRepository.update(restaurant);

    return {
      id: restaurant.id.id,
      name: restaurant.name,
      description: restaurant.description,
      phone: restaurant.phone,
      address: restaurant.address,
    };
  }
}
