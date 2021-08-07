import { ICreateFoodDishesDTO } from '@modules/foodDishes/dtos/ICreateFoodDishes';
import { FoodDishesFakerRepository } from '@modules/foodDishes/repositories/in-memory/FoodDishesFakerRepository';

import { CreateDishesUseCase } from '../CreateDishesUseCase';

let foodDishesFakerRepository: FoodDishesFakerRepository;
let createDishesUseCase: CreateDishesUseCase;

describe('Create User', () => {
  beforeEach(() => {
    foodDishesFakerRepository = new FoodDishesFakerRepository();
    createDishesUseCase = new CreateDishesUseCase(foodDishesFakerRepository);
  });

  it('should be able to new create dish', async () => {
    const createDishDTO: ICreateFoodDishesDTO = {
      name: 'test name',
      description: 'test description',
      price: 'test price',
      category_id: '1',
    };
    await createDishesUseCase.execute(createDishDTO);
    expect(foodDishesFakerRepository.dishes.length).toBe(1);
    expect(foodDishesFakerRepository.dishes[0]).toHaveProperty('id');
    expect(foodDishesFakerRepository.dishes[0]).toHaveProperty('name');
    expect(foodDishesFakerRepository.dishes[0]).toHaveProperty('description');
    expect(foodDishesFakerRepository.dishes[0]).toHaveProperty('price');
    expect(foodDishesFakerRepository.dishes[0]).toHaveProperty('category_id');
  });
});
