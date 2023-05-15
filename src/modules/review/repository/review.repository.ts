import Id from "../../@shared/domain/value-object/id.value-object";
import Review from "../domain/review.entity";
import ReviewGateway from "../gateway/review.gateway";
import { ReviewModel } from "./review.model";

export default class ReviewRepository implements ReviewGateway {
  async create(review: Review): Promise<Review> {
    const model = await ReviewModel.create({
      id: review.id.id,
      clientId: review.clientId,
      comment: review.comment,
      stars: review.stars,
      restaurantId: review.restaurantId,
      updatedAt: new Date(),
      createdAt: new Date(),
    });

    return new Review({
      id: new Id(model.id),
      clientId: model.clientId,
      stars: model.stars,
      comment: model.comment,
      restaurantId: model.restaurantId,
    });
  }
  async find(id: string): Promise<Review> {
    const review = await ReviewModel.findOne({ where: { id } });

    if (!review) {
      throw new Error("Review not found");
    }

    return new Review({
      id: new Id(review.id),
      clientId: review.clientId,
      comment: review.comment,
      restaurantId: review.restaurantId,
      stars: review.stars,
    });
  }
  async findAll(): Promise<Review[]> {
    const reviews = await ReviewModel.findAll();

    let allReviews: Review[] = [];
    reviews.forEach((review) => {
      const newRev = new Review({
        id: new Id(review.id),
        clientId: review.clientId,
        comment: review.comment,
        restaurantId: review.restaurantId,
        stars: review.stars,
      });
      allReviews.push(newRev);
    });

    return allReviews;
  }
  async update(entity: Review): Promise<void> {
    const review = await ReviewModel.findOne({ where: { id: entity.id.id } });

    if (!review) {
      throw new Error("Review not found");
    }
    
    await ReviewModel.update(
      {
        clientId: entity.clientId,
        comment: entity.comment,
        restaurantId: entity.restaurantId,
        stars: entity.stars,
      },
      { where: { id: entity.id.id } }
    );
  }
}
