import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { AppError } from '@shared/errors/AppError';
import { UserFakerRepository } from '../../../repositories/in-memory/UserFakerRepository';
import { CreateUserUseCase } from '../../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from '../AuthenticateUserUseCase';

let userFakerRepository: UserFakerRepository;
let createUserUseCase: CreateUserUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;

describe('Authenticate User', () => {
  beforeEach(() => {
    userFakerRepository = new UserFakerRepository();
    createUserUseCase = new CreateUserUseCase(userFakerRepository);
    authenticateUserUseCase = new AuthenticateUserUseCase(userFakerRepository);
  });
  it('should to be authenticate user', async () => {
    const user: ICreateUserDTO = {
      name: 'test',
      email: 'email@gmail.com',
      password: 'password',
    };
    await createUserUseCase.execute(user);
    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });
    expect(result).toHaveProperty('token');
  });
  it('Should not be able to authenticate an nonexistent user', () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'false@email.com',
        password: '1234',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
  it('Should not be able to authenticate witch incorrect password', () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        name: 'User Test Error',
        email: 'user@user.com',
        password: '1234',
      };
      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: user.email,
        password: '44444',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
  it('Should not be able to authenticate witch incorrect e-mail', () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        name: 'User Test Error',
        email: 'user@user.com',
        password: '1234',
      };
      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: 'blblblb@gmail.com',
        password: user.password,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
