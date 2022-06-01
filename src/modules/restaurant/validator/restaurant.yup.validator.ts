import ValidatorInterface from "../../@shared/validator/validator.interface";
import * as yup from "yup";
import Restaurant from "../domain/restaurant.entity";

export default class CustomerYupValidator
  implements ValidatorInterface<Restaurant>
{
  validate(entity: Restaurant): void {
    try {
      yup
        .object()
        .shape({
          id: yup.string().required("Id is required"),
          name: yup.string().required("Name is required"),
          phone: yup.string().required("Phone is required"),
          address: yup.string().required("Address is required")
        })
        .validateSync(
          {
            id: entity.id.id,
            name: entity.name,
            phone: entity.phone,
            address: entity.address
          },
          {
            abortEarly: false,
          }
        );
    } catch (errors) {
      const e = errors as yup.ValidationError;
      e.errors.forEach((error) => {
        entity.notification.addError({
          context: "restaurant",
          message: error,
        });
      });
    }
  }
}