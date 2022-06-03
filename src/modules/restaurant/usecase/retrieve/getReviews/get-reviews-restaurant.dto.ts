export interface GetReviewsRestaurantInputDto {
  id: string;
}

interface ReviewOutputDto {
  customerId: number;
  stars: number;
  comment: string;
}

export interface GetReviewsRestaurantOutputDto {
  restaurantId: number;
  averageStarsReceived: number;
  reviews: ReviewOutputDto[];
}
