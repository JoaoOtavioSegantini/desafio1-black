export interface GetReviewsCustomerInputDto {
  id: string;
}

interface ReviewOutputDto {
  restaurantId: number;
  stars: number;
  comment: string;
}

export interface GetReviewsCustomerOutputDto {
  customerId: number;
  averageStarsGiven: number;
  reviews: ReviewOutputDto[];
}
