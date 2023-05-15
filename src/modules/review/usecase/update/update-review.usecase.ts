import ReviewGateway from "../../gateway/review.gateway";
import {
  UpdateReviewInputDto,
  UpdateReviewOutputDto,
} from "./update-review.dto";

export default class UpdateReviewUseCase {
  private ReviewRepository: ReviewGateway;

  constructor(ReviewRepository: ReviewGateway) {
    this.ReviewRepository = ReviewRepository;
  }
  async execute(input: UpdateReviewInputDto): Promise<UpdateReviewOutputDto> {
    const review = await this.ReviewRepository.find(input.id);
    review.changeComment(input.comment);
    review.changeStars(input.stars);
    review.changeClientId(input.clientId);
    review.changeRestaurantId(input.restaurantId);
    await this.ReviewRepository.update(review);

    return {};
  }
}
