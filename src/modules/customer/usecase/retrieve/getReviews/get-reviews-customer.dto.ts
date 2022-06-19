export interface GetReviewsCustomerInputDto {
  id: string;
}

interface ReviewOutputDto {
  restaurantId: string;
  stars: number;
  comment: string;
}

export interface GetReviewsCustomerOutputDto {
  customerId: string;
  averageStarsGiven: number;
  reviews: ReviewOutputDto[];
}
