export interface UpdateReviewInputDto {
  id: string;
  clientId: number;
  restaurantId: number;
  stars: number;
  comment: string;
}

export interface UpdateReviewOutputDto {}
