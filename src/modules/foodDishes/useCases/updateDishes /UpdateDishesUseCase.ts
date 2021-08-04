import { inject, injectable } from 'tsyringe';

import { IFoodDishesRepository } from '@modules/foodDishes/repositories/IFoodDishesRepository';
import { AppError } from '@shared/errors/AppError';

interface IFoodDishesRequest {
  description?: string;
  price?: string;
}

@injectable()
class UpdateDishesUseCase {
  constructor(
    @inject('FoodDishesRepository')
    private foodDishesRepository: IFoodDishesRepository
  ) {}
  async execute(
    id: string,
    { description, price }: IFoodDishesRequest
  ): Promise<void> {
    const dishExists = await this.foodDishesRepository.findById(id);

    if (!dishExists) throw new AppError('Dish not found');
    await this.foodDishesRepository.update(id, {
      description,
      price,
    });
  }
}

export { UpdateDishesUseCase };
