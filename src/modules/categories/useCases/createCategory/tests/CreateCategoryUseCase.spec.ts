import { ICreateCategoriesDTO } from '@modules/categories/dtos/ICreateCategories';
import { AppError } from '@shared/errors/AppError';

import { CategoriesFakerRepository } from '../../../repositories/in-memory/CategoryFakerRepository';
import { CreateCategoryUseCase } from '../CreateCategoryUseCase';

let categoryFakerRepository: CategoriesFakerRepository;
let createCategoryUseCase: CreateCategoryUseCase;

describe('Create User', () => {
  beforeEach(() => {
    categoryFakerRepository = new CategoriesFakerRepository();
    createCategoryUseCase = new CreateCategoryUseCase(categoryFakerRepository);
  });

  it('should be able to new create category', async () => {
    const createCategoryDTO: ICreateCategoriesDTO = {
      name: 'test',
    };
    await createCategoryUseCase.execute(createCategoryDTO);
    expect(categoryFakerRepository.categories.length).toBe(1);
    expect(categoryFakerRepository.categories[0]).toHaveProperty('id');
    expect(categoryFakerRepository.categories[0]).toHaveProperty('name');
  });
  it('should throw an error if category name is empty', async () => {
    expect(async () => {
      await createCategoryUseCase.execute({ name: '' });
    }).rejects.toBeInstanceOf(AppError);
  });
});
