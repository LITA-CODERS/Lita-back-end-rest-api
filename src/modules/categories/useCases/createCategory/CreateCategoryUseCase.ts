import { inject, injectable } from 'tsyringe';

import { Categories } from '@modules/categories/infra/typeorm/entities/Categories';
import { ICategoriesRepository } from '@modules/categories/repositories/ICategoriesRepository';
import { AppError } from '@shared/errors/AppError';

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
    if (!name) throw new AppError('name is required');
    const result = this.categoriesRepository.create({
      name,
    });

    return result;
  }
}

export { CreateCategoryUseCase };
