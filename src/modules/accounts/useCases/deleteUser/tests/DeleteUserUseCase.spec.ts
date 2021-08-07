import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { AppError } from '@shared/errors/AppError';

import { UserFakerRepository } from '../../../repositories/in-memory/UserFakerRepository';
import { AuthenticateUserUseCase } from '../../authenticateUser/AuthenticateUserUseCase';
import { CreateUserUseCase } from '../../createUser/CreateUserUseCase';
import { DeleteUserUseCase } from '../DeleteUserUseCase';

let userFakerRepository: UserFakerRepository;
let createUserUseCase: CreateUserUseCase;
let deleteUserUseCase: DeleteUserUseCase;

describe('Delete User', () => {
  beforeEach(() => {
    userFakerRepository = new UserFakerRepository();
    createUserUseCase = new CreateUserUseCase(userFakerRepository);
    deleteUserUseCase = new DeleteUserUseCase(userFakerRepository);
  });

  it('should be able to delete user', async () => {
    const createUserDTO: ICreateUserDTO = {
      name: 'test',
      email: 'email@gmail.com',
      password: 'password',
    };
    const { id } = await createUserUseCase.execute(createUserDTO);
    await deleteUserUseCase.execute(id);
  });
  it('should throw error if user not exists', async () => {
    await expect(async () => {
      await deleteUserUseCase.execute('4');
    }).rejects.toBeInstanceOf(AppError);
  });
});
