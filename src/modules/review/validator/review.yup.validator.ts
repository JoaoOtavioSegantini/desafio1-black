import ValidatorInterface from "../../@shared/validator/validator.interface";
import * as yup from "yup";
import Review from "../domain/review.entity";

export default class ReviewYupValidator
  implements ValidatorInterface<Review>
{
  validate(entity: Review): void {
    try {
      yup
        .object()
        .shape({
          id: yup.string().required("Id is required"),
          stars: yup.number().required("Stars is required").min(0, "Stars must be between 0 and 5").max(5,"Stars must be between 0 and 5"),
          comment: yup.string().required("Comment is required"),
          clientId: yup.string().required("ClientId is required")
          //.uuid("ClientId must be a uuid"),
          ,
          restaurantId: yup.string().required("RestaurantId is required")
          //.uuid("RestaurantId must be a uuid")
        })
        .validateSync(
          {
            id: entity.id.id,
            stars: entity.stars,
            comment: entity.comment,
            clientId: entity.clientId,
            restaurantId: entity.restaurantId,
          },
          {
            abortEarly: false,
          }
        );
    } catch (errors) {
      const e = errors as yup.ValidationError;
      e.errors.forEach((error) => {
        entity.notification.addError({
          context: "review",
          message: error,
        });
      });
    }
  }
}
