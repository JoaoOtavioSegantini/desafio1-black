export interface CreateReviewInputDto {
  id?: string;
  clientId: number;
  restaurantId: number;
  stars: number;
  comment: string;
}

export interface CreateReviewOutputDto {
  id: string;
  clientId: number;
  restaurantId: number;
  stars: number;
  comment: string;
}
