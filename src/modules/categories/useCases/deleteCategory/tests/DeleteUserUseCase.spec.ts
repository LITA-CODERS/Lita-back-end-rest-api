import { ICreateCategoriesDTO } from '@modules/categories/dtos/ICreateCategories';
import { AppError } from '@shared/errors/AppError';

import { CategoriesFakerRepository } from '../../../repositories/in-memory/CategoryFakerRepository';
import { CreateCategoryUseCase } from '../../createCategory/CreateCategoryUseCase';
import { DeleteCategoryUseCase } from '../DeleteCategoryUseCase';

let categoriesFakerRepository: CategoriesFakerRepository;
let createCategoryUseCase: CreateCategoryUseCase;
let deleteCategoryUseCase: DeleteCategoryUseCase;

describe('Delete Category', () => {
  beforeEach(() => {
    categoriesFakerRepository = new CategoriesFakerRepository();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesFakerRepository
    );
    deleteCategoryUseCase = new DeleteCategoryUseCase(
      categoriesFakerRepository
    );
  });

  it('should be able to delete category', async () => {
    const createCategoryDTO: ICreateCategoriesDTO = {
      name: 'test',
    };
    const { id } = await createCategoryUseCase.execute(createCategoryDTO);
    await deleteCategoryUseCase.execute(id);
    expect(categoriesFakerRepository.categories.length).toBe(0);
  });
  it('should throw error if delete category not exists', async () => {
    await expect(async () => {
      await deleteCategoryUseCase.execute('4');
    }).rejects.toBeInstanceOf(AppError);
  });
});
