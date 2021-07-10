import { compare, hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import { User } from '@modules/accounts/infra/typeorm/entities/Users';
import { IUserRepository } from '@modules/accounts/repositories/IUserRepository';
import { AppError } from '@shared/errors/AppError';

interface IUserRequest {
  name?: string;
  email?: string;
  password?: string;
}

@injectable()
class UpdateUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {}
  async execute(
    id: string,
    { name, email, password }: IUserRequest
  ): Promise<void> {
    const userNotFound = await this.userRepository.findById(id);

    if (!userNotFound) throw new AppError('User not found !', 404);

    const userAlreadyExists = await this.userRepository.findByEmail(email);

    if (userAlreadyExists) throw new AppError('User already exists!');
    const passwordHash = await hash(password, 8);

    await this.userRepository.update(id, {
      name,
      email,
      password: passwordHash,
    });
  }
}

export { UpdateUserUseCase };
