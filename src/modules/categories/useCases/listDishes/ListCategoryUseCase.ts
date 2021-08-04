import { inject, injectable } from 'tsyringe';

import { Categories } from '@modules/categories/infra/typeorm/entities/Categories';
import { ICategoriesRepository } from '@modules/categories/repositories/ICategoriesRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class ListCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) {}
  async execute(): Promise<Categories[]> {
    const result = await this.categoriesRepository.findAll();
    if (result.length === 0) throw new AppError(`Categories not found`);
    return result;
  }
}
export { ListCategoryUseCase };
