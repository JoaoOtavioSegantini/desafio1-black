export interface CreateReviewInputDto {
  id?: string;
  clientId: string;
  restaurantId: string;
  stars: number;
  comment: string;
}

export interface CreateReviewOutputDto {
  id: string;
  clientId: string;
  restaurantId: string;
  stars: number;
  comment: string;
}
