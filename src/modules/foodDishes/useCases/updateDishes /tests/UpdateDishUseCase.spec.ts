import { ICreateFoodDishesDTO } from '@modules/foodDishes/dtos/ICreateFoodDishes';
import { FoodDishesFakerRepository } from '@modules/foodDishes/repositories/in-memory/FoodDishesFakerRepository';
import { AppError } from '@shared/errors/AppError';

import { CreateDishesUseCase } from '../../createDishes/CreateDishesUseCase';
import { UpdateDishesUseCase } from '../UpdateDishesUseCase';

let foodDishesFakerRepository: FoodDishesFakerRepository;
let createDishesUseCase: CreateDishesUseCase;
let updateDishesUseCase: UpdateDishesUseCase;

describe('Update Dish', () => {
  beforeEach(() => {
    foodDishesFakerRepository = new FoodDishesFakerRepository();
    createDishesUseCase = new CreateDishesUseCase(foodDishesFakerRepository);
    updateDishesUseCase = new UpdateDishesUseCase(foodDishesFakerRepository);
  });

  it('should be able to update dish', async () => {
    const createDishDTO: ICreateFoodDishesDTO = {
      name: 'test name',
      description: 'test description',
      price: 'test price',
      category_id: '1',
    };
    const { id } = await createDishesUseCase.execute(createDishDTO);
    await updateDishesUseCase.execute(id, {
      description: 'new test description',
      price: 'new test price',
    });
    expect(foodDishesFakerRepository.dishes[0].description).toBe(
      'new test description'
    );
    expect(foodDishesFakerRepository.dishes[0].price).toBe('new test price');
  });
  it('should throw error if update dish not exists', async () => {
    await expect(async () => {
      await updateDishesUseCase.execute('1', {
        description: 'new test description',
        price: 'new test price',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
