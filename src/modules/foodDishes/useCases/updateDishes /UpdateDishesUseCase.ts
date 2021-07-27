import { inject, injectable } from 'tsyringe';

import { FoodDishes } from '@modules/foodDishes/infra/typeorm/entities/FoodDishes';
import { IFoodDishesRepository } from '@modules/foodDishes/repositories/IFoodDishesRepository';
import { AppError } from '@shared/errors/AppError';

interface IFoodDishesRequest {
  description?: string;
  image_url?: string;
}

@injectable()
class UpdateDishesUseCase {
  constructor(
    @inject('FoodDishesRepository')
    private foodDishesRepository: IFoodDishesRepository
  ) {}
  async execute(
    id: string,
    { description, image_url }: IFoodDishesRequest
  ): Promise<void> {
    const dishExists = await this.foodDishesRepository.findById(id);

    if (!dishExists) throw new AppError('Dish not found');
    await this.foodDishesRepository.update(id, {
      description,
      image_url,
    });
  }
}

export { UpdateDishesUseCase };
