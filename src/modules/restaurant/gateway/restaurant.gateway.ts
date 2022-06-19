import Restaurant from "../domain/restaurant.entity";
import { GetReviewsRestaurantOutputDto } from "../usecase/retrieve/getReviews/get-reviews-restaurant.dto";
import { GetTopFiveOutputDto } from "../usecase/retrieve/top-five/top-five.restaurant.dto";

export default interface RestaurantGateway {
    create(restaurant: Restaurant): Promise<Restaurant>;
    find(id: string): Promise<Restaurant>;
    findAll(): Promise<Restaurant[]>;
    update(entity: Restaurant): Promise<void>;
    delete(id: string): Promise<void>;
    getReviews(id: string): Promise<GetReviewsRestaurantOutputDto>;
    getTopFive(): Promise<GetTopFiveOutputDto>
  }
  