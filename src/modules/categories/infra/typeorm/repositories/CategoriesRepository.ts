import { getRepository, Repository } from 'typeorm';

import { ICreateCategoriesDTO } from '@modules/categories/dtos/ICreateCategories';
import { ICategoriesRepository } from '@modules/categories/repositories/ICategoriesRepository';

import { Categories } from '../entities/Categories';

class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Categories>;

  constructor() {
    this.repository = getRepository(Categories);
  }

  async create({ name }: ICreateCategoriesDTO): Promise<Categories> {
    const categories = this.repository.create({
      name,
    });

    const result = await this.repository.save(categories);

    return result;
  }

  async findAll(): Promise<Categories[]> {
    const result = await this.repository.find();
    return result;
  }

  async findById(id: string): Promise<Categories> {
    const result = await this.repository.findOne({ id });

    return result;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete({
      id,
    });
  }
}

export { CategoriesRepository };
