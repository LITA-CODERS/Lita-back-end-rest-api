import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeleteUserUseCase } from './DeleteUserUseCase';

class DeleteUserController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const deleteUserUseCase = container.resolve(DeleteUserUseCase);

    const user = await deleteUserUseCase.execute(id);

    return response.json(user);
  }
}

export { DeleteUserController };
