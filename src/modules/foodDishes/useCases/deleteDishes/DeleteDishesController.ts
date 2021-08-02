import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeleteDishesUseCase } from './DeleteDishesUseCase';

class DeleteDishesController {
  async handle(request: Request, response: Response) {
    const deleteDishesUseCase = container.resolve(DeleteDishesUseCase);
    const { id } = request.params;

    await deleteDishesUseCase.execute(id);
    return response.status(200).json({
      message: 'delete success',
    });
  }
}

export { DeleteDishesController };
