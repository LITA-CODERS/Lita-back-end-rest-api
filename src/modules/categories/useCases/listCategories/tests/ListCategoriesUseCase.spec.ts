import { AppError } from '@shared/errors/AppError';

import { CategoriesFakerRepository } from '../../../repositories/in-memory/CategoryFakerRepository';
import { CreateCategoryUseCase } from '../../createCategory/CreateCategoryUseCase';
import { ListCategoryUseCase } from '../ListCategoryUseCase';

let categoryFakerRepository: CategoriesFakerRepository;
let createCategoryUseCase: CreateCategoryUseCase;
let listCategoryUseCase: ListCategoryUseCase;

describe('List User', () => {
  beforeEach(() => {
    categoryFakerRepository = new CategoriesFakerRepository();
    createCategoryUseCase = new CreateCategoryUseCase(categoryFakerRepository);
    listCategoryUseCase = new ListCategoryUseCase(categoryFakerRepository);
  });

  it('should be able to list categories', async () => {
    await createCategoryUseCase.execute({
      name: 'test',
    });
    await createCategoryUseCase.execute({
      name: 'test2',
    });
    await createCategoryUseCase.execute({
      name: 'test3',
    });
    await listCategoryUseCase.execute();
    expect(categoryFakerRepository.categories.length).toBe(3);
  });
  it('should throw error if list categories not exists', async () => {
    await expect(async () => {
      await listCategoryUseCase.execute();
    }).rejects.toBeInstanceOf(AppError);
  });
});
