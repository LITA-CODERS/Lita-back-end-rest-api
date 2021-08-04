import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListDishesUseCase } from './ListDishesUseCase';

class ListDishesController {
  async handle(request: Request, response: Response) {
    const listDishesUseCase = container.resolve(ListDishesUseCase);

    const result = await listDishesUseCase.execute();
    return response.status(200).json({
      result,
    });
  }
}

export { ListDishesController };
