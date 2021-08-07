import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { AppError } from '@shared/errors/AppError';

import { UserFakerRepository } from '../../../repositories/in-memory/UserFakerRepository';
import { CreateUserUseCase } from '../../createUser/CreateUserUseCase';
import { FindUserByIdUseCase } from '../FindUserByIdUseCase';

let userFakerRepository: UserFakerRepository;
let createUserUseCase: CreateUserUseCase;
let findUserByIdUseCase: FindUserByIdUseCase;

describe('Find User By Id', () => {
  beforeEach(() => {
    userFakerRepository = new UserFakerRepository();
    createUserUseCase = new CreateUserUseCase(userFakerRepository);
    findUserByIdUseCase = new FindUserByIdUseCase(userFakerRepository);
  });

  it('should be able to find user', async () => {
    const createUserDTO: ICreateUserDTO = {
      name: 'test',
      email: 'email@gmail.com',
      password: 'password',
    };
    const { id } = await createUserUseCase.execute(createUserDTO);
    await findUserByIdUseCase.execute(id);
    expect(userFakerRepository.users[0]).toHaveProperty('id');
    expect(userFakerRepository.users[0]).toHaveProperty('name');
    expect(userFakerRepository.users[0]).toHaveProperty('email');
    expect(userFakerRepository.users[0]).toHaveProperty('password');
  });
  it('should throw error if find user not exists', async () => {
    await expect(async () => {
      await findUserByIdUseCase.execute('21');
    }).rejects.toBeInstanceOf(AppError);
  });
});
