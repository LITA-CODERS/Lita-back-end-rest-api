import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';

import { CreateUserUseCase } from './CreateUserUseCase';

class CreateUserController {
  async handle(request: Request, response: Response) {
    const { name, email, password }: ICreateUserDTO = request.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    const user = await createUserUseCase.execute({
      name,
      email,
      password,
    });

    return response.status(201).json(user);
  }
}

export { CreateUserController };
