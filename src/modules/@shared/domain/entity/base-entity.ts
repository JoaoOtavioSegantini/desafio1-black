import Notification from "../notification/notification";
import Id from "../value-object/id.value-object";

export default class BaseEntity {
  private _id: Id;
  private _createdAt: Date;
  private _updatedAt: Date;
  public notification: Notification;

  constructor(id?: Id) {
    this._id = id;
    this._createdAt = new Date();
    this._updatedAt = new Date();
    this.notification = new Notification();
  }

  public get id(): Id {
    return this._id;
  }

  public get createdAt(): Date {
    return this._createdAt;
  }
  
  public get updatedAt(): Date {
    return this._updatedAt;
  }
}
