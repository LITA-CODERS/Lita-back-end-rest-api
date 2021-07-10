import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { IUpdateUserDTO } from '@modules/accounts/dtos/IUpdateUserDTO';

import { UpdateUserUseCase } from './UpdateUserUseCase';

class UpdateUserController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const { name, email, password }: IUpdateUserDTO = request.body;

    const updateUserUseCase = container.resolve(UpdateUserUseCase);

    const user = await updateUserUseCase.execute(id, {
      name,
      email,
      password,
    });

    return response.status(200).json(user);
  }
}

export { UpdateUserController };
