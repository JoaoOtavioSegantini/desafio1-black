export interface FindRestaurantInputDto {
  id: string;
}

export interface FindRestaurantOutputDto {
  id: string;
  name: string;
  phone: string;
  address: string;
  description: string
}
