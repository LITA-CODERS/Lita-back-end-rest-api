import { container } from 'tsyringe';

import { UserRepository } from '@modules/accounts/infra/typeorm/repositories/UserRepository';
import { IUserRepository } from '@modules/accounts/repositories/IUserRepository';
import { IFoodDishesRepository } from '@modules/foodDishes/repositories/IFoodDishesRepository';
import { FoodDishesRepository } from '@modules/foodDishes/infra/typeorm/repositories/FoodDishesRepository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
container.registerSingleton<IFoodDishesRepository>(
  'FoodDishesRepository',
  FoodDishesRepository
);
