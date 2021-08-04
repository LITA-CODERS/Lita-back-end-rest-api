import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeleteCategoryUseCase } from './DeleteCategoryUseCase';

class DeleteCategoryController {
  async handle(request: Request, response: Response) {
    const deleteCategoryUseCase = container.resolve(DeleteCategoryUseCase);
    const { id } = request.params;

    await deleteCategoryUseCase.execute(id);
    return response.status(200).json({
      message: 'delete success',
    });
  }
}

export { DeleteCategoryController };
