import { inject, injectable } from 'tsyringe';

import { FoodDishes } from '@modules/foodDishes/infra/typeorm/entities/FoodDishes';
import { IFoodDishesRepository } from '@modules/foodDishes/repositories/IFoodDishesRepository';

interface IFoodDishesRequest {
  name: string;
  description: string;
  price: string;
  category_id: string;
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
    price,
    category_id,
  }: IFoodDishesRequest): Promise<FoodDishes> {
    const result = this.foodDishesRepository.create({
      name,
      description,
      price,
      category_id,
    });

    return result;
  }
}

export { CreateDishesUseCase };
