import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateDishesUseCase } from './UpdateDishesUseCase';

interface IFoodDishesRequest {
  description?: string;
  price?: string;
}

class UpdateDishesController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const { description, price }: IFoodDishesRequest = request.body;

    const updateDishesUseCase = container.resolve(UpdateDishesUseCase);

    await updateDishesUseCase.execute(id, {
      description,
      price,
    });
    return response.status(200).json({
      message: 'update success',
    });
  }
}

export { UpdateDishesController };
