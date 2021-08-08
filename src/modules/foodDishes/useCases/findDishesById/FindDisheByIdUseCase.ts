import { inject, injectable } from 'tsyringe';

import { FoodDishes } from '@modules/foodDishes/infra/typeorm/entities/FoodDishes';
import { IFoodDishesRepository } from '@modules/foodDishes/repositories/IFoodDishesRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class FindDisheByIdUseCase {
  constructor(
    @inject('FoodDishesRepository')
    private foodDishesRepository: IFoodDishesRepository
  ) {}
  async execute(id: string): Promise<FoodDishes> {
    const foodDisheExists = await this.foodDishesRepository.findById(id);

    if (!foodDisheExists) throw new AppError('Dish not found', 404);
    return foodDisheExists;
  }
}

export { FindDisheByIdUseCase };
