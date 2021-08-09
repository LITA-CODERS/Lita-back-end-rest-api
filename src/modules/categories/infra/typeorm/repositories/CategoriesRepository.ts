import { EntityManager, getManager, getRepository, Repository } from 'typeorm';

import { ICreateCategoriesDTO } from '@modules/categories/dtos/ICreateCategories';
import { ICategoriesRepository } from '@modules/categories/repositories/ICategoriesRepository';

import { Categories } from '../entities/Categories';

class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Categories>;
  private manager: EntityManager;

  constructor() {
    this.repository = getRepository(Categories);
    this.manager = getManager();
  }

  async create({ name }: ICreateCategoriesDTO): Promise<Categories> {
    const categories = this.repository.create({
      name,
    });

    const result = await this.repository.save(categories);

    return result;
  }

  async findAll(): Promise<Categories[]> {
    const result = await this.manager.query(`
    SELECT fd.name, fd.description, fd.price, c.name as category_name FROM categories c
    LEFT JOIN food_dishes fd  ON fd.category_id = c.id
    `);

    return result;
  }

  async findById(id: string): Promise<Categories> {
    const result = await this.manager.query(`
    SELECT fd.name, fd.description, fd.price, c.name as category_name FROM categories c
    LEFT JOIN food_dishes fd  ON fd.category_id = c.id
    WHERE c.id = '${id}'
    `);

    return result;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete({
      id,
    });
  }
}

export { CategoriesRepository };
