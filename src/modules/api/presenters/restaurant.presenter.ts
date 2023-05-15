import { toXML } from "jstoxml";
import { FindAllRestaurantOutputDto } from "../../restaurant/usecase/retrieve/findAll/findAll-restaurant.dto";

export default class RestaurantPresenter {
  static listXML(data: FindAllRestaurantOutputDto): string {
    const xmlOption = {
      header: true,
      indent: "  ",
      newline: "\n",
      allowEmpty: true,
    };

    return toXML(
      {
        restaurants: data.map((res) => ({
          restaurant: {
            id: res.id,
            name: res.name,
            phone: res.phone,
            description: res.description,
            address: res.address,
          },
        })),
      },
      xmlOption
    );
  }
}
