export interface CreateRestaurantInputDto {
  id?: string
  name: string;
  phone: string;
  description: string;
  address: string;
}


export interface CreateRestaurantOutputDto {
  id: string
  name: string;
  phone: string;
  description: string;
  address: string;
}

