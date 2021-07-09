import { getRepository, Repository } from 'typeorm';

import { FoodDishes } from '../entities/FoodDishes';
import { IUpdateFoodDishesDTO } from '@modules/foodDishes/dtos/IUpdateFoodDishesDTO';
import { ICreateFoodDishesDTO } from '@modules/foodDishes/dtos/ICreateFoodDishes';
import { IFoodDishesRepository } from '@modules/foodDishes/repositories/IFoodDishesRepository';

class UserRepository implements IFoodDishesRepository {
  private repository: Repository<FoodDishes>;

  constructor() {
    this.repository = getRepository(FoodDishes);
  }

  async create({
    name,
    description,
    image_url,
  }: ICreateFoodDishesDTO): Promise<FoodDishes> {
    const foodDishes = this.repository.create({
      name,
      description,
      image_url,
    });

    const result = await this.repository.save(foodDishes);

    return result;
  }

  async update(
    id: string,
    { description, image_url }: IUpdateFoodDishesDTO
  ): Promise<void> {
    await this.repository.update({ id }, { description, image_url });
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

export { UserRepository };
