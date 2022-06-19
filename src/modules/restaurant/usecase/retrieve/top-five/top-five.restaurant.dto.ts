export interface GetTopFiveInputDto {}

interface ReviewOutputDto {
  stars: number;
}

export interface OutputDto {
  id: string;
  name: string;
  averageReviews: number;
  reviews: ReviewOutputDto[];
}


export interface GetTopFiveOutputDto extends Array<OutputDto> {}
