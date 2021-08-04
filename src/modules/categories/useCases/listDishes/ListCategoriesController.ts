import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListCategoryUseCase } from './ListCategoryUseCase';

class ListCategoriesController {
  async handle(request: Request, response: Response) {
    const listCategoryUseCase = container.resolve(ListCategoryUseCase);

    const result = await listCategoryUseCase.execute();
    return response.status(200).json({
      result,
    });
  }
}

export { ListCategoriesController };