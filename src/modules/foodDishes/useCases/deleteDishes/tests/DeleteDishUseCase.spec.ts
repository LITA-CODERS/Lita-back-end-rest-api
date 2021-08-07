import { ICreateFoodDishesDTO } from '@modules/foodDishes/dtos/ICreateFoodDishes';
import { FoodDishesFakerRepository } from '@modules/foodDishes/repositories/in-memory/FoodDishesFakerRepository';
import { AppError } from '@shared/errors/AppError';

import { CreateDishesUseCase } from '../../createDishes/CreateDishesUseCase';
import { DeleteDishesUseCase } from '../DeleteDishesUseCase';

let foodDishesFakerRepository: FoodDishesFakerRepository;
let createDishesUseCase: CreateDishesUseCase;
let deleteDishUseCase:  DeleteDishesUseCase;

describe('Delete dish', () => {
  beforeEach(() => {
    foodDishesFakerRepository = new FoodDishesFakerRepository();
    createDishesUseCase = new CreateDishesUseCase(foodDishesFakerRepository);
    deleteDishUseCase = new DeleteDishesUseCase(foodDishesFakerRepository);
  });

  it('should be able to delete dish', async () => {
    const createDishDTO: ICreateFoodDishesDTO = {
      name: 'test name',
      description: 'test description',
      price: 'test price',
      category_id: '1',
    };
    const { id } = await createDishesUseCase.execute(createDishDTO);
    await deleteDishUseCase.execute(id);
    expect(foodDishesFakerRepository.dishes).toHaveLength(0);
  });
  it('should not be able to delete dish if id is not provided', async () => {
    await expect(async () => {
      await deleteDishUseCase.execute('4');
    }).rejects.toBeInstanceOf(AppError);
  });
});
