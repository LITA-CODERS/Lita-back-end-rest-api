import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FindDisheByIdUseCase } from './FindDisheByIdUseCase';

class FindDisheByIdController {
  async handle(request: Request, response: Response) {
    const findDisheByIdUseCase = container.resolve(FindDisheByIdUseCase);
    const { id } = request.params;

    const result = await findDisheByIdUseCase.execute(id);
    return response.status(200).json({
      result,
    });
  }
}

export { FindDisheByIdController };
