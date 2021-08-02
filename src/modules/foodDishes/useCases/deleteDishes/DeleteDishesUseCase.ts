import { inject, injectable } from 'tsyringe';

import { IFoodDishesRepository } from '@modules/foodDishes/repositories/IFoodDishesRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class DeleteDishesUseCase {
  constructor(
    @inject('FoodDishesRepository')
    private foodDishesRepository: IFoodDishesRepository
  ) {}
  async execute(id: string): Promise<void> {
    const dishExists = await this.foodDishesRepository.findById(id);

    if (!dishExists) throw new AppError('Dish not found');
    await this.foodDishesRepository.delete(id);
  }
}

export { DeleteDishesUseCase };
