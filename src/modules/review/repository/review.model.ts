import {
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { CustomerModel } from "../../customer/repository/customer.model";
import { RestaurantModel } from "../../restaurant/repository/restaurant.model";

@Table({
  tableName: "reviews",
  timestamps: false,
})
export class ReviewModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string;

  @ForeignKey(() => CustomerModel)
  @Column({ allowNull: false })
  clientId: string;

  @Column({ allowNull: false, validate: { isInt: true, min: 0, max: 5 } })
  stars: number;

  @Column({ allowNull: false })
  comment: string;

  @ForeignKey(() => RestaurantModel)
  @Column({ allowNull: false })
  restaurantId: string;

  @Column({ allowNull: false })
  createdAt: Date;

  @Column({ allowNull: false })
  updatedAt: Date;
}
