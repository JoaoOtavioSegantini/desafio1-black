export interface UpdateReviewInputDto {
  id: string;
  clientId: string;
  restaurantId?: string;
  stars: number;
  comment: string;
}

export interface UpdateReviewOutputDto {}
