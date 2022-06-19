import express, { Request, Response } from "express";
import CustomerRepository from "../../customer/repository/customer.repository";
import CreateCustomerUseCase from "../../customer/usecase/create/create-customer.usecase";
import DeleteCustomerUseCase from "../../customer/usecase/delete/delete.customer.usecase";
import FindAllCustomerUseCase from "../../customer/usecase/retrieve/findAll/findAll-customer.usecase";
import GetReviewsCustomerUseCase from "../../customer/usecase/retrieve/getReviews/get-reviews-customer.usecase";
import UpdateCustomerUseCase from "../../customer/usecase/update/update.customer.usecase";
import CustomerPresenter from "../presenters/customer.presenter";

export const customerRoute = express.Router();

customerRoute.post("/", async (req: Request, res: Response) => {
  const usecase = new CreateCustomerUseCase(new CustomerRepository());
  try {
    const customerDto = {
      name: req.body.name,
      phone: req.body.phone,
    };
    const output = await usecase.execute(customerDto);
    res.send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});

customerRoute.get("/", async (req: Request, res: Response) => {
  const usecase = new FindAllCustomerUseCase(new CustomerRepository());
  const output = await usecase.execute({});

  res.format({
    json: async () => res.send(output),
    xml: async () => res.send(CustomerPresenter.listXML(output)),
  });
});

customerRoute.put("/:id", async (req: Request, res: Response) => {
  const usecase = new UpdateCustomerUseCase(new CustomerRepository());
  try {
    const customerDto = {
      id: req.params.id,
      name: req.body.name,
      phone: req.body.phone,
    };
    const output = await usecase.execute(customerDto);
    res.send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});

customerRoute.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const usecase = new DeleteCustomerUseCase(new CustomerRepository());

  const input = { id };

  try {
    await usecase.execute(input);
    res.send({});
  } catch (error) {
    res.status(500).send(error);
  }
});

customerRoute.get("/:id/reviews", async (req: Request, res: Response) => {
  const usecase = new GetReviewsCustomerUseCase(new CustomerRepository());
  try {
    const input = {
      id: req.params.id,
    };
    const output = await usecase.execute(input);
    res.send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});
