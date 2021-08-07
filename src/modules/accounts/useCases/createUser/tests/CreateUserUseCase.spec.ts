import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { AppError } from '@shared/errors/AppError';

import { UserFakerRepository } from '../../../repositories/in-memory/UserFakerRepository';
import { CreateUserUseCase } from '../CreateUserUseCase';

let userFakerRepository: UserFakerRepository;
let createUserUseCase: CreateUserUseCase;

describe('Create User', () => {
  beforeEach(() => {
    userFakerRepository = new UserFakerRepository();
    createUserUseCase = new CreateUserUseCase(userFakerRepository);
  });

  it('should be able to new create user', async () => {
    const createUserDTO: ICreateUserDTO = {
      name: 'test',
      email: 'email@gmail.com',
      password: 'password',
    };
    const response = await createUserUseCase.execute(createUserDTO);
    expect(userFakerRepository.users.length).toBe(1);
    expect(userFakerRepository.users[0].name).toBe(response.name);
    expect(userFakerRepository.users[0].email).toBe(response.email);
    expect(userFakerRepository.users[0].password).toBe(response.password);
  });
  it('should throw error if user already exists', async () => {
    await expect(async () => {
      const createUserDTO: ICreateUserDTO = {
        name: 'test',
        email: 'email@gmail.com',
        password: 'password',
      };
      await createUserUseCase.execute(createUserDTO);
      await createUserUseCase.execute(createUserDTO);
    }).rejects.toBeInstanceOf(AppError);
  });
  it('should throw error if e-mail incorrect', async () => {
    await expect(async () => {
      const createUserDTO: ICreateUserDTO = {
        name: 'test',
        email: '',
        password: 'password',
      };
      await createUserUseCase.execute(createUserDTO);
    }).rejects.toBeInstanceOf(AppError);
  });
});
