import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base-entity";
import Id from "../../@shared/domain/value-object/id.value-object";

interface Props {
  id?: Id;
  clientId: number;
  stars: number;
  comment: string;
  restaurantId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export default class Review extends BaseEntity implements AggregateRoot {
  private _clientId: number;
  private _stars: number;
  private _comment: string;
  private _restaurantId: number;

  constructor(props: Props) {
    super(props.id);
    this._clientId = props.clientId;
    this._stars = props.stars;
    this._comment = props.comment;
    this._restaurantId = props.restaurantId;
  }

  public get clientId(): number {
    return this._clientId;
  }

  public get stars(): number {
    return this._stars;
  }

  public get comment(): string {
    return this._comment;
  }

  public get restaurantId(): number {
    return this._restaurantId;
  }

  public set clientId(value: number) {
    this._clientId = value;
  }

  public set stars(value: number) {
    //  this._numberOfReviews = this._numberOfReviews + 1;
    // this._stars = (this._stars + value) / this.numberOfReviews;
    this._stars = value;
  }

  public set comment(value: string) {
    this._comment = value;
  }

  public set restaurantId(value: number) {
    this._restaurantId = value;
  }
}
