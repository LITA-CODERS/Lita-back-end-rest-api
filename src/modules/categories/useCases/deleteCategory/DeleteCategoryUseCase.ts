import { inject, injectable } from 'tsyringe';

import { ICategoriesRepository } from '@modules/categories/repositories/ICategoriesRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class DeleteCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) {}
  async execute(id: string): Promise<void> {
    const categoryExists = await this.categoriesRepository.findById(id);

    if (!categoryExists) throw new AppError('Category not found');
    await this.categoriesRepository.delete(id);
  }
}

export { DeleteCategoryUseCase };
