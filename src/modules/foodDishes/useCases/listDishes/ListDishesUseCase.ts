import { inject, injectable } from 'tsyringe';

import { FoodDishes } from '@modules/foodDishes/infra/typeorm/entities/FoodDishes';
import { IFoodDishesRepository } from '@modules/foodDishes/repositories/IFoodDishesRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class ListDishesUseCase {
  constructor(
    @inject('FoodDishesRepository')
    private foodDishesRepository: IFoodDishesRepository
  ) {}
  async execute(): Promise<FoodDishes[]> {
    const result = await this.foodDishesRepository.findAll();
    if (result.length === 0) throw new AppError(`No food dishes found`, 404);
    return result;
  }
}
export { ListDishesUseCase };
