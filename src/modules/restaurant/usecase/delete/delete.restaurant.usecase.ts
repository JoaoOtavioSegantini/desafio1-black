import RestaurantGateway from "../../gateway/restaurant.gateway";
import {
  InputDeleteRestaurantDto,
  OutputDeleteRestaurantDto,
} from "./delete.restaurant.dto";

export default class DeleteRestaurantUseCase {
  constructor(private readonly RestaurantGateway: RestaurantGateway) {}

  async execute(
    input: InputDeleteRestaurantDto
  ): Promise<OutputDeleteRestaurantDto> {
    await this.RestaurantGateway.delete(input.id);

    return {};
  }
}
