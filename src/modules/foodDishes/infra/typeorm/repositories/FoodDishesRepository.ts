import { getRepository, Repository } from 'typeorm';

import { ICreateFoodDishesDTO } from '@modules/foodDishes/dtos/ICreateFoodDishes';
import { IUpdateFoodDishesDTO } from '@modules/foodDishes/dtos/IUpdateFoodDishesDTO';
import { IFoodDishesRepository } from '@modules/foodDishes/repositories/IFoodDishesRepository';

import { FoodDishes } from '../entities/FoodDishes';

class FoodDishesRepository implements IFoodDishesRepository {
  private repository: Repository<FoodDishes>;

  constructor() {
    this.repository = getRepository(FoodDishes);
  }

  async create({
    name,
    description,
    price,
    category_id,
  }: ICreateFoodDishesDTO): Promise<FoodDishes> {
    const foodDishes = this.repository.create({
      name,
      description,
      price,
      category_id,
    });

    const result = await this.repository.save(foodDishes);

    return result;
  }

  async update(
    id: string,
    { description, price }: IUpdateFoodDishesDTO
  ): Promise<void> {
    await this.repository.update({ id }, { description, price });
  }

  async findAll(): Promise<FoodDishes[]> {
    const result = await this.repository.find();
    return result;
  }

  async findByName(name: string): Promise<FoodDishes> {
    const result = await this.repository.findOne({
      name,
    });

    return result;
  }

  async findById(id: string): Promise<FoodDishes> {
    const result = await this.repository.findOne({ id });

    return result;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete({
      id,
    });
  }
}

export { FoodDishesRepository };
