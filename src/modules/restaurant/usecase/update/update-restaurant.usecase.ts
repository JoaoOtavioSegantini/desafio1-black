import Id from "../../../@shared/domain/value-object/id.value-object";
import Restaurant from "../../domain/restaurant.entity";
import RestaurantGateway from "../../gateway/restaurant.gateway";
import {
  UpdateRestaurantInputDto,
  UpdateRestaurantOutputDto,
} from "./update-restaurant.dto";

export default class UpdateRestaurantUseCase {
  private _restaurantRepository: RestaurantGateway;

  constructor(_restaurantRepository: RestaurantGateway) {
    this._restaurantRepository = _restaurantRepository;
  }
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
