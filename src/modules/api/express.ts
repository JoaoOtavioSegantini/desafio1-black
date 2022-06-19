import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import { CustomerModel } from "../customer/repository/customer.model";
import { RestaurantModel } from "../restaurant/repository/restaurant.model";
import { ReviewModel } from "../review/repository/review.model";
import { customerRoute } from "./routes/customer.route";
import { restaurantRoute } from "./routes/restaurant.route";

export const app: Express = express();
app.use(express.json());

app.use("/customers", customerRoute);
app.use("/restaurants", restaurantRoute);

export let sequelize: Sequelize;

async function setupDb() {
  sequelize = new Sequelize({
    dialect: "postgres",
    username: process.env.DATABASE_USERNAME || "root",
    password: process.env.DATABASE_PASS || "123456",
    host: process.env.DB_HOST || "localhost",
    database: process.env.DATABASE || "restaurant-sequelize-challenge",
    logging: false,
  });
  await sequelize.addModels([CustomerModel, RestaurantModel, ReviewModel]);
  if (process.env.NODE_ENV != "test") await sequelize.sync();
}
setupDb();
