export interface FindAllRestaurantInputDto {}

interface RestaurantOutputDto {
  id: string;
  name: string;
  description: string;
  phone: string;
  address: string;
}

export interface FindAllRestaurantOutputDto extends Array<RestaurantOutputDto> {}
