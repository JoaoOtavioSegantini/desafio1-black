import Id from "../../../@shared/domain/value-object/id.value-object";
import Review from "../../domain/review.entity";
import ReviewGateway from "../../gateway/review.gateway";
import {
  CreateReviewInputDto,
  CreateReviewOutputDto,
} from "./create-review.dto";

export default class CreateReviewUseCase {
  private ReviewRepository: ReviewGateway;

  constructor(ReviewRepository: ReviewGateway) {
    this.ReviewRepository = ReviewRepository;
  }
  async execute(input: CreateReviewInputDto): Promise<CreateReviewOutputDto> {
    const props = {
      id: new Id(input.id),
      clientId: input.clientId,
      restaurantId: input.restaurantId,
      stars: input.stars,
      comment: input.comment,
    };
    const review = new Review(props);
    this.ReviewRepository.create(review);

    return {
      id: review.id.id,
      clientId: review.clientId,
      restaurantId: review.restaurantId,
      stars: review.stars,
      comment: review.comment,
    };
  }
}
