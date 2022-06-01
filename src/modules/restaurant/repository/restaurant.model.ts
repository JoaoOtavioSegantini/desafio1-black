import {
  Column,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { ReviewModel } from "../../review/repository/review.model";

@Table({
  tableName: "restaurants",
  timestamps: false,
})
export class RestaurantModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string;

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false })
  phone: string;

  @Column({ allowNull: false })
  description: string;

  @Column({ allowNull: false })
  address: string;

  @HasMany(() => ReviewModel)
  reviews: ReviewModel[];

  @Column
  numberOfReviews: number;

  @Column({ allowNull: false })
  createdAt: Date;

  @Column({ allowNull: false })
  updatedAt: Date;
}
