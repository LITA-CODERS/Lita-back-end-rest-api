import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { AppError } from '@shared/errors/AppError';

import { UserFakerRepository } from '../../../repositories/in-memory/UserFakerRepository';
import { CreateUserUseCase } from '../../createUser/CreateUserUseCase';
import { ListUserUseCase } from '../ListUserUseCase';

let userFakerRepository: UserFakerRepository;
let createUserUseCase: CreateUserUseCase;
let listUserUseCase: ListUserUseCase;

describe('List Users', () => {
  beforeEach(() => {
    userFakerRepository = new UserFakerRepository();
    createUserUseCase = new CreateUserUseCase(userFakerRepository);
    listUserUseCase = new ListUserUseCase(userFakerRepository);
  });

  it('should be able to list users', async () => {
    await createUserUseCase.execute({
      name: 'test',
      email: 'email@gmail.com',
      password: 'password',
    });
    await createUserUseCase.execute({
      name: 'test2',
      email: 'email2@gmail.com',
      password: 'password',
    });
    await createUserUseCase.execute({
      name: 'test3',
      email: 'email3@gmail.com',
      password: 'password',
    });
    await listUserUseCase.execute();
    expect(userFakerRepository.users.length).toBe(3);
  });
  it('should throw error if list users not exists', async () => {
    await expect(async () => {
      await listUserUseCase.execute();
    }).rejects.toBeInstanceOf(AppError);
  });
});
