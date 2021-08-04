import { inject, injectable } from 'tsyringe';

import { Categories } from '@modules/categories/infra/typeorm/entities/Categories';
import { ICategoriesRepository } from '@modules/categories/repositories/ICategoriesRepository';

interface ICategoriesRequest {
  name: string;
}

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) {}
  async execute({ name }: ICategoriesRequest): Promise<Categories> {
    const result = this.categoriesRepository.create({
      name,
    });

    return result;
  }
}

export { CreateCategoryUseCase };
