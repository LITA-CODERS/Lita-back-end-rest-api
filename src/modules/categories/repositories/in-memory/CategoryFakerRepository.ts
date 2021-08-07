import { Categories } from '@modules/categories/infra/typeorm/entities/Categories';

import { ICreateCategoriesDTO } from '../../dtos/ICreateCategories';
import { ICategoriesRepository } from '../ICategoriesRepository';

class CategoriesFakerRepository implements ICategoriesRepository {
  categories: Categories[] = [];

  async create({ name }: ICreateCategoriesDTO): Promise<Categories> {
    const category = new Categories();
    Object.assign(category, { name });

    this.categories.push(category);

    return category;
  }
  async update(id: string, { name }: ICreateCategoriesDTO): Promise<void> {
    const category = new Categories();
    const findIndex = this.categories.findIndex(
      (category) => category.id === id
    );
    Object.assign(category, { name });

    this.categories[findIndex] = category;
  }
  async findAll(): Promise<Categories[]> {
    // eslint-disable-next-line no-return-await
    return await this.categories;
  }
  async findById(id: string): Promise<Categories> {
    return this.categories.find((category) => category.id === id);
  }
  async delete(id: string): Promise<void> {
    const findIndex = this.categories.findIndex(
      (category) => category.id === id
    );
    this.categories.splice(findIndex, 1);
  }
}

export { CategoriesFakerRepository };
