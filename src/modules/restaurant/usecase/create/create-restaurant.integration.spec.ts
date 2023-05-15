import { Sequelize } from "sequelize-typescript";
import { ReviewModel } from "../../../review/repository/review.model";
import { RestaurantModel } from "../../repository/restaurant.model";
import RestaurantRepository from "../../repository/restaurant.repository";
import CreateRestaurantUseCase from "./create-restaurant.usecase";

describe("Create restaurant integration test", () => {
    let sequelize: Sequelize;
  
    beforeEach(async () => {
      sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
        sync: { force: true },
      });
  
      jest.useFakeTimers("modern").setSystemTime(new Date(2023, 9, 1, 7));
  
      sequelize.addModels([RestaurantModel, ReviewModel]);
      await sequelize.sync();
    });
  
    afterEach(async () => {
      await sequelize.close();
    });
    it("should create a restaurant", async () => {
      const restaurantRepository = new RestaurantRepository();
      const usecase = new CreateRestaurantUseCase(restaurantRepository);
  
      const input = {
        name: "Restaurant One",
        phone: "15333985-558",
        description: "a simple fast food restaurant",
        address: "district one, xxx, State x"
      };
  
      let restaurants = await restaurantRepository.findAll();
  
      expect(restaurants.length).toBe(0);
  
      const result = await usecase.execute(input);
      expect(result.id).toBeDefined();
      expect(result.name).toBe("Restaurant One");
      expect(result.phone).toBe("15333985-558");
  
      restaurants = await restaurantRepository.findAll();
      expect(restaurants.length).toBe(1);
    });
  });
  