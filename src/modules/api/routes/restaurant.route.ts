import express, { Request, Response } from "express";
import RestaurantRepository from "../../restaurant/repository/restaurant.repository";
import CreateRestaurantUseCase from "../../restaurant/usecase/create/create-restaurant.usecase";
import DeleteRestaurantUseCase from "../../restaurant/usecase/delete/delete.restaurant.usecase";
import FindAllRestaurantUseCase from "../../restaurant/usecase/retrieve/findAll/findAll-restaurant.usecase";
import GetReviewsRestaurantUseCase from "../../restaurant/usecase/retrieve/getReviews/get-reviews-restaurant.usecase";
import GetTopFiveRestaurantUseCase from "../../restaurant/usecase/retrieve/top-five/top-five.restaurant.usecase";
import UpdateRestaurantUseCase from "../../restaurant/usecase/update/update-restaurant.usecase";
import ReviewRepository from "../../review/repository/review.repository";
import CreateReviewUseCase from "../../review/usecase/create/create-review.usecase";
import UpdateReviewUseCase from "../../review/usecase/update/update-review.usecase";
import RestaurantPresenter from "../presenters/restaurant.presenter";

export const restaurantRoute = express.Router();

restaurantRoute.post("/", async (req: Request, res: Response) => {
  const usecase = new CreateRestaurantUseCase(new RestaurantRepository());
  try {
    const restaurantDto = {
      name: req.body.name,
      phone: req.body.phone,
      description: req.body.description,
      address: req.body.address,
    };
    const output = await usecase.execute(restaurantDto);
    res.send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});

restaurantRoute.get("/", async (req: Request, res: Response) => {
  const usecase = new FindAllRestaurantUseCase(new RestaurantRepository());
  const output = await usecase.execute({});

  res.format({
    json: async () => res.send(output),
    xml: async () => res.send(RestaurantPresenter.listXML(output)),
  });
});

restaurantRoute.put("/:id", async (req: Request, res: Response) => {
  const usecase = new UpdateRestaurantUseCase(new RestaurantRepository());
  try {
    const restaurantDto = {
      id: req.params.id,
      name: req.body.name,
      phone: req.body.phone,
      description: req.body.description,
      address: req.body.address,
    };
    const output = await usecase.execute(restaurantDto);
    res.send(output);
  } catch (error) {
    res.status(500).send(error);
  }
});

restaurantRoute.delete("/:id", async (req: Request, res: Response) => {
  const usecase = new DeleteRestaurantUseCase(new RestaurantRepository());
  try {
    const restaurantDto = {
      id: req.params.id,
    };
    const output = await usecase.execute(restaurantDto);
    res.send(output);
  } catch (error) {
    res.status(500).send(error);
  }
});

restaurantRoute.get("/:id/reviews", async (req: Request, res: Response) => {
  const usecase = new GetReviewsRestaurantUseCase(new RestaurantRepository());
  try {
    const restaurantDto = {
      id: req.params.id,
    };
    const output = await usecase.execute(restaurantDto);
    res.send(output);
  } catch (error) {
    res.status(500).send(error);
  }
});

restaurantRoute.post("/:id/reviews", async (req: Request, res: Response) => {
  const usecase = new CreateReviewUseCase(new ReviewRepository());
  try {
    const restaurantDto = {
      restaurantId: req.params.id,
      clientId: req.body.clientId,
      stars: req.body.stars,
      comment: req.body.comment,
    };
    
    const output = await usecase.execute(restaurantDto);
    res.send(output);
  } catch (error) {
    res.status(500).send(error);
  }
});

restaurantRoute.put("/:id/reviews", async (req: Request, res: Response) => {
  const usecase = new UpdateReviewUseCase(new ReviewRepository());
  try {
    const restaurantDto = {
      id: req.params.id,
      clientId: req.body.clientId,
      stars: req.body.stars,
      comment: req.body.comment,
    };
    const output = await usecase.execute(restaurantDto);
    res.send(output);
  } catch (error) {
    res.status(500).send(error);
  }
});

restaurantRoute.get("/top-five", async (req: Request, res: Response) => {
  const usecase = new GetTopFiveRestaurantUseCase(new RestaurantRepository());
  try {
    const restaurantDto = {};

    const output = await usecase.execute(restaurantDto);
    res.send(output);
  } catch (error) {
    res.status(500).send(error);
  }
});
