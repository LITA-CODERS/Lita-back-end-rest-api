import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateDishesUseCase } from './CreateDishesUseCase';

interface IFoodDishesRequest {
  name: string;
  description: string;
  image_url: string;
}

class CreateDishesController {
  async handle(request: Request, response: Response) {
    const { name, description, image_url }: IFoodDishesRequest = request.body;

    const createDishesUseCase = container.resolve(CreateDishesUseCase);

    const dishes = await createDishesUseCase.execute({
      name,
      description,
      image_url,
    });
    return response.status(201).json(dishes);
  }
}

export { CreateDishesController };
