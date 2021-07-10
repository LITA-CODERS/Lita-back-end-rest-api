import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FindUserByIdUseCase } from './FindUserByIdUseCase';

class FindUserByIdUseController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const findUserByIdUseCase = container.resolve(FindUserByIdUseCase);

    const user = await findUserByIdUseCase.execute(id);

    return response.json(user);
  }
}

export { FindUserByIdUseController };
