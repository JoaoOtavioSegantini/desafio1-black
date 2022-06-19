export interface GetReviewsRestaurantInputDto {
  id: string;
}

export interface ReviewOutputDto {
  customerId: string;
  stars: number;
  comment: string;
}

export interface GetReviewsRestaurantOutputDto {
  restaurantId: string;
  averageStarsReceived: number;
  reviews: ReviewOutputDto[];
}
