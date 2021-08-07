import { FoodDishesFakerRepository } from '@modules/foodDishes/repositories/in-memory/FoodDishesFakerRepository';
import { AppError } from '@shared/errors/AppError';

import { CreateDishesUseCase } from '../../createDishes/CreateDishesUseCase';
import { ListDishesUseCase } from '../ListDishesUseCase';

let foodDishesFakerRepository: FoodDishesFakerRepository;
let createDishesUseCase: CreateDishesUseCase;
let listDishesUseCase: ListDishesUseCase;

describe('List User', () => {
  beforeEach(() => {
    foodDishesFakerRepository = new FoodDishesFakerRepository();
    createDishesUseCase = new CreateDishesUseCase(foodDishesFakerRepository);
    listDishesUseCase = new ListDishesUseCase(foodDishesFakerRepository);
  });
  it('should be able to list categories', async () => {
    await createDishesUseCase.execute({
      name: 'test1 name',
      description: 'test1 description',
      price: 'test1 price',
      category_id: '1',
    });
    await createDishesUseCase.execute({
      name: 'test2 name',
      description: 'test2 description',
      price: 'test2 price',
      category_id: '2',
    });
    await createDishesUseCase.execute({
      name: 'test3 name',
      description: 'test3 description',
      price: 'test3 price',
      category_id: '3',
    });
    await listDishesUseCase.execute();
    expect(foodDishesFakerRepository.dishes.length).toBe(3);
  });
  it('should throw error if list dishes not exists', async () => {
    expect(async () => {
      await listDishesUseCase.execute();
    }).rejects.toBeInstanceOf(AppError);
  });
});
