import ValidatorInterface from "../../@shared/validator/validator.interface";
import Restaurant from "../domain/restaurant.entity";
import RestaurantYupValidator from "../validator/restaurant.yup.validator";

export default class RestaurantValidatorFactory {
  static create(): ValidatorInterface<Restaurant> {
    return new RestaurantYupValidator();
  }
}