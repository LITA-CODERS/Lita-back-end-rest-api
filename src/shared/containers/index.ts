import { container } from 'tsyringe';

import { UserRepository } from '@modules/accounts/infra/typeorm/repositories/UserRepository';
import { IUserRepository } from '@modules/accounts/repositories/IUserRepository';
import { CategoriesRepository } from '@modules/categories/infra/typeorm/repositories/CategoriesRepository';
import { ICategoriesRepository } from '@modules/categories/repositories/ICategoriesRepository';
import { FoodDishesRepository } from '@modules/foodDishes/infra/typeorm/repositories/FoodDishesRepository';
import { IFoodDishesRepository } from '@modules/foodDishes/repositories/IFoodDishesRepository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
container.registerSingleton<IFoodDishesRepository>(
  'FoodDishesRepository',
  FoodDishesRepository
);
container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository
);
