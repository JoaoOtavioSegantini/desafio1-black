import Id from "../../../@shared/domain/value-object/id.value-object";
import Restaurant from "../../domain/restaurant.entity";
import RestaurantGateway from "../../gateway/restaurant.gateway";
import {
  CreateRestaurantInputDto,
  CreateRestaurantOutputDto,
} from "./create-restaurant.dto";

export default class CreateRestaurantUseCase {
  private _restaurantRepository: RestaurantGateway;

  constructor(_restaurantRepository: RestaurantGateway) {
    this._restaurantRepository = _restaurantRepository;
  }
  async execute(
    input: CreateRestaurantInputDto
  ): Promise<CreateRestaurantOutputDto> {
    const props = {
      id: new Id(input.id),
      name: input.name,
      phone: input.phone,
      address: input.address,
      description: input.description,
    };
    const restaurant = new Restaurant(props);
    this._restaurantRepository.create(restaurant);

    return {
      id: restaurant.id.id,
      name: restaurant.name,
      description: restaurant.description,
      phone: restaurant.phone,
      address: restaurant.address,
    };
  }
}
