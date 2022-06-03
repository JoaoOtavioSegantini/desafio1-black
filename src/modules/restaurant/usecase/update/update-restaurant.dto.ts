export interface UpdateRestaurantInputDto {
  id?: string
  name: string;
  phone: string;
  description: string;
  address: string;
}


export interface UpdateRestaurantOutputDto {
  id: string
  name: string;
  phone: string;
  description: string;
  address: string;
}

