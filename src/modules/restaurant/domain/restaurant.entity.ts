import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base-entity";
import NotificationError from "../../@shared/domain/notification/notification.error";
import Id from "../../@shared/domain/value-object/id.value-object";
import RestaurantValidatorFactory from "../factory/restaurant.validator.factory";

interface Props {
  id?: Id;
  name: string;
  phone: string;
  description: string;
  address: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export default class Restaurant extends BaseEntity implements AggregateRoot {
  private _name: string;
  private _phone: string;
  private _description: string;
  private _address: string;
  private _numberOfReviews: number;

  constructor(props: Props) {
    super(props.id);
    this._name = props.name;
    this._phone = props.phone;
    this._description = props.description;
    this._address = props.address;

    this.validate();
    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }

  public get name(): string {
    return this._name;
  }

  public get phone(): string {
    return this._phone;
  }

  public get description(): string {
    return this._description;
  }

  public get address(): string {
    return this._address;
  }

  public get numberOfReviews(): number {
    return this._numberOfReviews;
  }

  addReviews() {
    this._numberOfReviews++;
  }

  validate() {
    RestaurantValidatorFactory.create().validate(this);
  }

  changeName(value: string) {
    this._name = value;
  }
  changePhone(value: string) {
    this._phone = value;
  }
  changeDescription(value: string) {
    this._description = value;
  }
  changeAddress(value: string) {
    this._address = value;
  }

  public set name(value: string) {
    this._name = value;
  }

  public set phone(value: string) {
    this._phone = value;
  }

  public set description(value: string) {
    this._description = value;
  }

  public set address(value: string) {
    this._address = value;
  }
}
