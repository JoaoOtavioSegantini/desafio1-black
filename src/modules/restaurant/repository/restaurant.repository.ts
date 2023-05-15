import Id from "../../@shared/domain/value-object/id.value-object";
import Review from "../../review/domain/review.entity";
import { ReviewModel } from "../../review/repository/review.model";
import Restaurant from "../domain/restaurant.entity";
import RestaurantGateway from "../gateway/restaurant.gateway";
import { RestaurantModel } from "./restaurant.model";

export default class RestaurantRepository implements RestaurantGateway {
  async getTopFive() {
    const restaurants = await RestaurantModel.findAll({
      attributes: ["id", "name"],
      include: {
        association: "reviews",
        attributes: ["stars"],
      },
    });

    const topFive = restaurants
      .map((restaurant) => {
        const averageReviews = restaurant.reviews
          ? restaurant.reviews.reduce(
              (accum, review) => review.stars + accum,
              0
            ) / restaurant.reviews.length
          : 0;

        return {
          ...restaurant.get(),
          averageReviews,
        };
      })
      .sort((a, b) => b.averageReviews - a.averageReviews)
      .slice(0, 5);

    return topFive;
  }
  async create(restaurant: Restaurant): Promise<Restaurant> {
    const model = await RestaurantModel.create({
      id: restaurant.id.id,
      name: restaurant.name,
      phone: restaurant.phone,
      description: restaurant.description,
      address: restaurant.address,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return new Restaurant({
      id: new Id(model.id),
      name: model.name,
      description: model.description,
      phone: model.phone,
      address: model.address,
    });
  }
  async find(id: string): Promise<Restaurant> {
    const model = await RestaurantModel.findOne({ where: { id } });
    if (!model) {
      throw new Error("Restaurant not found");
    }

    return new Restaurant({
      id: new Id(model.id),
      name: model.name,
      phone: model.phone,
      address: model.address,
      description: model.description,
    });
  }
  async findAll(): Promise<Restaurant[]> {
    const models = await RestaurantModel.findAll();

    let restaurants: Restaurant[] = [];

    models.forEach((model) => {
      const restaurant = new Restaurant({
        id: new Id(model.id),
        name: model.name,
        phone: model.phone,
        address: model.address,
        description: model.description,
      });
      restaurants.push(restaurant);
    });

    return restaurants;
  }
  async update(entity: Restaurant): Promise<void> {
    await RestaurantModel.update(
      {
        name: entity.name,
        phone: entity.phone,
        address: entity.address,
        description: entity.description,
      },
      { where: { id: entity.id.id } }
    );
  }
  async delete(id: string): Promise<void> {
    const model = await RestaurantModel.findOne({ where: { id } });
    if (!model) {
      return;
    }
    await RestaurantModel.destroy({ where: { id } });
  }
  async getReviews(id: string) {
    const model = await RestaurantModel.findOne({
      where: { id },
      include: [{ model: ReviewModel }],
    });
    if (!model) {
      throw new Error("Restaurant not found");
    }

    let reviews: Review[] = [];
    let starsReceived: number = 0;
    model.reviews.forEach((rev) => {
      const review = new Review({
        id: new Id(rev.id),
        clientId: rev.clientId,
        comment: rev.comment,
        restaurantId: rev.restaurantId,
        stars: rev.stars,
      });

      reviews.push(review);
      starsReceived += review.stars;
    });

    const response = {
      restaurantId: id,
      averageStarsReceived: starsReceived / reviews.length,
      reviews: reviews.map((rev) => {
        return {
          customerId: rev.clientId,
          stars: rev.stars,
          comment: rev.comment,
        };
      }),
    };

    return response;
  }
}
