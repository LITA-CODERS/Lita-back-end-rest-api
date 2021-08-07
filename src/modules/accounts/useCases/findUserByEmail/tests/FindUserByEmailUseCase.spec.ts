import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { AppError } from '@shared/errors/AppError';

import { UserFakerRepository } from '../../../repositories/in-memory/UserFakerRepository';
import { CreateUserUseCase } from '../../createUser/CreateUserUseCase';
import { FindUserByEmailUseCase } from '../FindUserByEmailUseCase';

let userFakerRepository: UserFakerRepository;
let createUserUseCase: CreateUserUseCase;
let findUserByEmailUseCase: FindUserByEmailUseCase;

describe('Find User By Email', () => {
  beforeEach(() => {
    userFakerRepository = new UserFakerRepository();
    createUserUseCase = new CreateUserUseCase(userFakerRepository);
    findUserByEmailUseCase = new FindUserByEmailUseCase(userFakerRepository);
  });

  it('should be able to find user', async () => {
    const createUserDTO: ICreateUserDTO = {
      name: 'test',
      email: 'email@gmail.com',
      password: 'password',
    };
    const { email } = await createUserUseCase.execute(createUserDTO);
    await findUserByEmailUseCase.execute(email);
    expect(userFakerRepository.users.length).toBe(1);
    expect(userFakerRepository.users[0]).toHaveProperty('id');
    expect(userFakerRepository.users[0]).toHaveProperty('name');
    expect(userFakerRepository.users[0]).toHaveProperty('email');
    expect(userFakerRepository.users[0]).toHaveProperty('password');
  });
  it('should throw error if find user not exists', async () => {
    await expect(async () => {
      await findUserByEmailUseCase.execute('teste@gmail.com');
    }).rejects.toBeInstanceOf(AppError);
  });
});
