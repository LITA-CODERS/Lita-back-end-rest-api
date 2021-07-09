import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import { User } from '@modules/accounts/infra/typeorm/entities/Users';
import { IUserRepository } from '@modules/accounts/repositories/IUserRepository';
import { AppError } from '@shared/errors/AppError';

interface IUserRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {}
  async execute({ name, email, password }: IUserRequest): Promise<User> {
    if (!email) throw new AppError('Email incorrect!');

    const userAlreadyExists = await this.userRepository.findByEmail(email);

    if (userAlreadyExists) throw new AppError('User already exists!');

    const passwordHash = await hash(password, 8);

    const result = this.userRepository.create({
      name,
      email,
      password: passwordHash,
    });

    return result;
  }
}

export { CreateUserUseCase };
