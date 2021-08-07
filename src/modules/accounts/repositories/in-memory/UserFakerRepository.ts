import { IUpdateUserDTO } from '@modules/accounts/dtos/IUpdateUserDTO';
import { User } from '@modules/accounts/infra/typeorm/entities/Users';

import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { IUserRepository } from '../IUserRepository';

class UserFakerRepository implements IUserRepository {
  users: User[] = [];

  async create({ email, name, password }: ICreateUserDTO): Promise<User> {
    const user = new User();
    Object.assign(user, { email, name, password });

    this.users.push(user);

    return user;
  }
  async update(
    id: string,
    { email, name, password }: IUpdateUserDTO
  ): Promise<void> {
    const user = new User();
    const findIndex = this.users.findIndex((user) => user.id === id);
    Object.assign(user, { id, email, name, password });

    this.users[findIndex] = user;
  }
  async findAll(): Promise<User[]> {
    // eslint-disable-next-line no-return-await
    return await this.users;
  }
  async findByEmail(email: string): Promise<User> {
    return this.users.find((user) => user.email === email);
  }
  async findById(id: string): Promise<User> {
    return this.users.find((user) => user.id === id);
  }
  async delete(id: string): Promise<void> {
    const findIndex = this.users.findIndex((user) => user.id === id);
    this.users.splice(findIndex, 1);
  }
}

export { UserFakerRepository };
