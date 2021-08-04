import { inject, injectable } from 'tsyringe';

import { Categories } from '@modules/categories/infra/typeorm/entities/Categories';
import { ICategoriesRepository } from '@modules/categories/repositories/ICategoriesRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class FindCategoryByIdUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) {}
  async execute(id: string): Promise<Categories> {
    const categoryExists = await this.categoriesRepository.findById(id);

    if (!categoryExists) throw new AppError('Category not found');
    return categoryExists;
  }
}

export { FindCategoryByIdUseCase };
