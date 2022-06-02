export interface FindAllCustomerInputDto {}

interface CustomerOutputDto {
  id: string;
  name: string;
  phone: string;
}

export interface FindAllCustomerOutputDto extends Array<CustomerOutputDto> {}
