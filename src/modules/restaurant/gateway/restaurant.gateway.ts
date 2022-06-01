import Restaurant from "../domain/restaurant.entity";

export default interface RestaurantGateway {
    create(restaurant: Restaurant): Promise<Restaurant>;
    find(id: string): Promise<Restaurant>;
    findAll(): Promise<Restaurant[]>;
    update(entity: Restaurant): Promise<void>;
    delete(id: string): Promise<void>;
    getReviews(id: string): any;
  }
  