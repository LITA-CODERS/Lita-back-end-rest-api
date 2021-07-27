import { inject, injectable } from 'tsyringe';

import { FoodDishes } from '@modules/foodDishes/infra/typeorm/entities/FoodDishes';
import { IFoodDishesRepository } from '@modules/foodDishes/repositories/IFoodDishesRepository';

interface IFoodDishesRequest {
  name: string;
  description: string;
  image_url: string;
}

@injectable()
class CreateDishesUseCase {
  constructor(
    @inject('FoodDishesRepository')
    private foodDishesRepository: IFoodDishesRepository
  ) {}
  async execute({
    name,
    description,
    image_url,
  }: IFoodDishesRequest): Promise<FoodDishes> {
    const result = this.foodDishesRepository.create({
      name,
      description,
      image_url,
    });

    return result;
  }
}

export { CreateDishesUseCase };
