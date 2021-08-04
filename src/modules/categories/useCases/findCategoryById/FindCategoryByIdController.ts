import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FindCategoryByIdUseCase } from './FindCategoryByIdUseCase';

class FindCategoryByIdController {
  async handle(request: Request, response: Response) {
    const findCategoryByIdUseCase = container.resolve(FindCategoryByIdUseCase);
    const { id } = request.params;

    const result = await findCategoryByIdUseCase.execute(id);
    return response.status(200).json({
      result,
    });
  }
}

export { FindCategoryByIdController };
