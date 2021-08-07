import { ICreateFoodDishesDTO } from '@modules/foodDishes/dtos/ICreateFoodDishes';
import { FoodDishesFakerRepository } from '@modules/foodDishes/repositories/in-memory/FoodDishesFakerRepository';
import { AppError } from '@shared/errors/AppError';

import { CreateDishesUseCase } from '../../createDishes/CreateDishesUseCase';
import { FindDisheByIdUseCase } from '../FindDisheByIdUseCase';

let foodDishesFakerRepository: FoodDishesFakerRepository;
let createDishesUseCase: CreateDishesUseCase;
let findDisheByIdUseCase: FindDisheByIdUseCase;

describe('Delete dish', () => {
  beforeEach(() => {
    foodDishesFakerRepository = new FoodDishesFakerRepository();
    createDishesUseCase = new CreateDishesUseCase(foodDishesFakerRepository);
    findDisheByIdUseCase = new FindDisheByIdUseCase(foodDishesFakerRepository);
  });

  it('should be able to find dish', async () => {
    const createDishDTO: ICreateFoodDishesDTO = {
      name: 'test name',
      description: 'test description',
      price: 'test price',
      category_id: '1',
    };
    const { id } = await createDishesUseCase.execute(createDishDTO);
    await findDisheByIdUseCase.execute(id);
    expect(foodDishesFakerRepository.dishes).toHaveLength(1);
    expect(foodDishesFakerRepository.dishes[0]).toHaveProperty('id');
    expect(foodDishesFakerRepository.dishes[0]).toHaveProperty('name');
    expect(foodDishesFakerRepository.dishes[0]).toHaveProperty('description');
    expect(foodDishesFakerRepository.dishes[0]).toHaveProperty('price');
    expect(foodDishesFakerRepository.dishes[0]).toHaveProperty('category_id');
  });
  it('should not be able to find dish not exists', async () => {
    await expect(async () => {
      await findDisheByIdUseCase.execute('4');
    }).rejects.toBeInstanceOf(AppError);
  });
});
