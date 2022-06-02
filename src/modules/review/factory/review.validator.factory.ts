import ValidatorInterface from "../../@shared/validator/validator.interface";
import Review from "../domain/review.entity";
import ReviewYupValidator from "../validator/review.yup.validator";

export default class ReviewValidatorFactory {
  static create(): ValidatorInterface<Review> {
    return new ReviewYupValidator();
  }
}