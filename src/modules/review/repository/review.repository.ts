import Id from "../../@shared/domain/value-object/id.value-object";
import Review from "../domain/review.entity";
import reviewEntity from "../domain/review.entity";
import ReviewGateway from "../gateway/review.gateway";
import { ReviewModel } from "./review.model";

export default class ReviewRepository implements ReviewGateway {
  async create(review: reviewEntity): Promise<reviewEntity> {
    const model = await ReviewModel.create({
      id: new Id(review.id.id),
      clientId: review.clientId,
      comment: review.comment,
      stars: review.stars,
      restaurantId: review.restaurantId,
      updatedAt: new Date(),
      createdAt: new Date(),
    });

    return new Review({
      clientId: model.clientId,
      stars: model.stars,
      comment: model.comment,
      restaurantId: model.restaurantId,
    });
  }
  async find(id: string): Promise<reviewEntity> {
    const review = await ReviewModel.findOne({ where: { id } });

    if (!review) {
      throw new Error("Review not found");
    }

    return new Review({
      clientId: review.clientId,
      comment: review.comment,
      restaurantId: review.restaurantId,
      stars: review.stars,
    });
  }
  async findAll(): Promise<reviewEntity[]> {
    const reviews = await ReviewModel.findAll();

    let allReviews: Review[] = [];
    reviews.map((review) => {
      const newRev = new Review({
        clientId: review.clientId,
        comment: review.comment,
        restaurantId: review.restaurantId,
        stars: review.stars,
      });
      allReviews.push(newRev);
    });

    return allReviews;
  }
  async update(id: string): Promise<void> {
    const review = await ReviewModel.findOne({ where: { id } });

    if (!review) {
      throw new Error("Review not found");
    }
    await ReviewModel.update(
      {
        clientId: review.clientId,
        comment: review.comment,
        restaurantId: review.restaurantId,
        stars: review.stars,
      },
      { where: { id } }
    );
  }
}
