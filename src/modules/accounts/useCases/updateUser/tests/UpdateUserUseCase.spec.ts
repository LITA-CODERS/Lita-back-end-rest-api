import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { AppError } from '@shared/errors/AppError';

import { UserFakerRepository } from '../../../repositories/in-memory/UserFakerRepository';
import { CreateUserUseCase } from '../../createUser/CreateUserUseCase';
import { UpdateUserUseCase } from '../UpdateUserUseCase';

let userFakerRepository: UserFakerRepository;
let createUserUseCase: CreateUserUseCase;
let updateUserUseCase: UpdateUserUseCase;

describe('Update User', () => {
  beforeEach(() => {
    userFakerRepository = new UserFakerRepository();
    createUserUseCase = new CreateUserUseCase(userFakerRepository);
    updateUserUseCase = new UpdateUserUseCase(userFakerRepository);
  });

  it('should be able to update user', async () => {
    const createUserDTO: ICreateUserDTO = {
      name: 'test',
      email: 'email@gmail.com',
      password: 'password',
    };
    const { id } = await createUserUseCase.execute(createUserDTO);
    await updateUserUseCase.execute(id, {
      name: 'newName',
      email: 'newEmail@gmail.com',
      password: '5454',
    });
    expect(userFakerRepository.users[0].name).toBe('newName');
    expect(userFakerRepository.users[0].email).toBe('newEmail@gmail.com');
  });
  it('should throw error if update user not exists', async () => {
    await expect(async () => {
      await updateUserUseCase.execute('1', {
        name: 'newName',
        email: 'newEmail@gmail.com',
        password: '5454',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
  it('should throw error if e-mail already exists', async () => {
    await expect(async () => {
      const createUserDTO: ICreateUserDTO = {
        name: 'test',
        email: 'test@gmail.com',
        password: 'password',
      };
      await createUserUseCase.execute({
        name: 'test',
        email: 'test2@gmail.com',
        password: 'password',
      });
      const { id } = await createUserUseCase.execute(createUserDTO);
      await updateUserUseCase.execute(id, {
        name: 'test',
        email: 'test2@gmail.com',
        password: 'password',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
