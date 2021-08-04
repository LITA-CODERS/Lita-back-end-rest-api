import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateDishesUseCase } from './CreateDishesUseCase';

interface IFoodDishesRequest {
  name: string;
  description: string;
  price: string;
  category_id: string;
}

class CreateDishesController {
  async handle(request: Request, response: Response) {
    const { name, description, price, category_id }: IFoodDishesRequest =
      request.body;

    const createDishesUseCase = container.resolve(CreateDishesUseCase);

    const dishes = await createDishesUseCase.execute({
      name,
      description,
      price,
      category_id,
    });
    return response.status(201).json(dishes);
  }
}

export { CreateDishesController };
