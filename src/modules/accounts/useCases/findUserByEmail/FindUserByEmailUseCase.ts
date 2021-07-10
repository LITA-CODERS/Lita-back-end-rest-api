import { inject, injectable } from 'tsyringe';

import { User } from '@modules/accounts/infra/typeorm/entities/Users';
import { IUserRepository } from '@modules/accounts/repositories/IUserRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class FindUserByEmailUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {}
  async execute(email: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) throw new AppError('User not found !', 404);

    return user;
  }
}

export { FindUserByEmailUseCase };
