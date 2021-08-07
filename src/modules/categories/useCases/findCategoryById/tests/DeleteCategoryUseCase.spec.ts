import { ICreateCategoriesDTO } from '@modules/categories/dtos/ICreateCategories';
import { AppError } from '@shared/errors/AppError';

import { CategoriesFakerRepository } from '../../../repositories/in-memory/CategoryFakerRepository';
import { CreateCategoryUseCase } from '../../createCategory/CreateCategoryUseCase';
import { FindCategoryByIdUseCase } from '../FindCategoryByIdUseCase';

let categoriesFakerRepository: CategoriesFakerRepository;
let createCategoryUseCase: CreateCategoryUseCase;
let findCategoryByIdUseCase: FindCategoryByIdUseCase;

describe('Find By Id Category', () => {
  beforeEach(() => {
    categoriesFakerRepository = new CategoriesFakerRepository();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesFakerRepository
    );
    findCategoryByIdUseCase = new FindCategoryByIdUseCase(
      categoriesFakerRepository
    );
  });

  it('should be able to find category', async () => {
    const createCategoryDTO: ICreateCategoriesDTO = {
      name: 'test',
    };
    const { id } = await createCategoryUseCase.execute(createCategoryDTO);
    await findCategoryByIdUseCase.execute(id);
    expect(categoriesFakerRepository.categories.length).toBe(1);
    expect(categoriesFakerRepository.categories[0]).toHaveProperty('id');
    expect(categoriesFakerRepository.categories[0]).toHaveProperty('name');
  });
  it('should throw error if find category not exists', async () => {
    await expect(async () => {
      await findCategoryByIdUseCase.execute('4');
    }).rejects.toBeInstanceOf(AppError);
  });
});
