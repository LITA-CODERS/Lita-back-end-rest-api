import { getRepository, Repository } from 'typeorm';

import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { IUserRepository } from '@modules/accounts/repositories/IUserRepository';
import { IUpdateUserDTO } from '@modules/accounts/dtos/IUpdateUserDTO';
import { User } from '../entities/Users';

class UserRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({ name, email, password }: ICreateUserDTO): Promise<User> {
    const user = this.repository.create({
      name,
      email,
      password,
    });

    const result = await this.repository.save(user);

    return result;
  }

  async update(
    id: string,
    { name, email, password }: IUpdateUserDTO
  ): Promise<void> {
    await this.repository.update({ id }, { name, email, password });
  }

  async findAll(): Promise<User[]> {
    const result = await this.repository.find();
    return result;
  }

  async findByEmail(email: string): Promise<User> {
    const result = await this.repository.findOne({
      email,
    });

    return result;
  }

  async findById(id: string): Promise<User> {
    const result = await this.repository.findOne({ id });

    return result;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete({
      id,
    });
  }
}

export { UserRepository };
