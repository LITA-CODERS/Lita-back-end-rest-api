import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FindUserByEmailUseCase } from './FindUserByEmailUseCase';

class FindUserByEmailUseController {
  async handle(request: Request, response: Response) {
    const { email } = request.params;
    const findUserByEmailUseCase = container.resolve(FindUserByEmailUseCase);

    const user = await findUserByEmailUseCase.execute(email);

    return response.json(user);
  }
}

export { FindUserByEmailUseController };
