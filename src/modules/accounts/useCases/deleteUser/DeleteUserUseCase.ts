import { inject, injectable } from 'tsyringe';

import { IUserRepository } from '@modules/accounts/repositories/IUserRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class DeleteUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {}
  async execute(id: string): Promise<void> {
    const user = await this.userRepository.findById(id);

    if (!user) throw new AppError('User not found !', 404);

    await this.userRepository.delete(id);
  }
}

export { DeleteUserUseCase };
