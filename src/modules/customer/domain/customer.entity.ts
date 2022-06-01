import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base-entity";
import NotificationError from "../../@shared/domain/notification/notification.error";
import Id from "../../@shared/domain/value-object/id.value-object";
import CustomerValidatorFactory from "../factory/customer.validator.factory";

interface Props {
  id?: Id;
  name: string;
  phone: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export default class Customer extends BaseEntity implements AggregateRoot {
  private _name: string;
  private _phone: string;
  private _numberOfReviews: number;

  constructor(props: Props) {
    super(props.id);
    this._name = props.name;
    this._phone = props.phone;

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

  public get numberOfReviews(): number {
    return this._numberOfReviews;
  }

  validate() {
    CustomerValidatorFactory.create().validate(this);
  }

  addReviews() {
    this._numberOfReviews++;
  }

  changeName(value: string) {
    console.log("antes", value, this._name, this.name);

    this._name = value;
    console.log("depois", value, this._name, this.name);
  }

  changePhone(value: string) {
    this._phone = value;
  }

  public set name(value: string) {
    this._name = value;
  }

  public set phone(value: string) {
    this._phone = value;
  }
}
