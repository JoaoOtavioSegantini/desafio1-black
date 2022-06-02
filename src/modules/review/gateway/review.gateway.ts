import Review from "../domain/review.entity";

export default interface ReviewGateway {
  create(review: Review): Promise<Review>;
  find(id: string): Promise<Review>;
  findAll(): Promise<Review[]>;
  update(review: Review): Promise<void>;
}
