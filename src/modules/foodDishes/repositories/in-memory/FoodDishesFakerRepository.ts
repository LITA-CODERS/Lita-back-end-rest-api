import { IUpdateFoodDishesDTO } from '@modules/foodDishes/dtos/IUpdateFoodDishesDTO';
import { FoodDishes } from '@modules/foodDishes/infra/typeorm/entities/FoodDishes';

import { ICreateFoodDishesDTO } from '../../dtos/ICreateFoodDishes';
import { IFoodDishesRepository } from '../IFoodDishesRepository';

class FoodDishesFakerRepository implements IFoodDishesRepository {
  dishes: FoodDishes[] = [];

  async create({
    name,
    description,
    price,
    category_id,
  }: ICreateFoodDishesDTO): Promise<FoodDishes> {
    const foodDishes = new FoodDishes();
    Object.assign(foodDishes, { name, description, price, category_id });

    this.dishes.push(foodDishes);

    return foodDishes;
  }
  async update(
    id: string,
    { description, price }: IUpdateFoodDishesDTO
  ): Promise<void> {
    const foodDishes = new FoodDishes();
    const findIndex = this.dishes.findIndex((dish) => dish.id === id);
    Object.assign(foodDishes, { description, price });

    this.dishes[findIndex] = foodDishes;
  }
  async findAll(): Promise<FoodDishes[]> {
    // eslint-disable-next-line no-return-await
    return await this.findAll();
  }
  async findByName(name: string): Promise<FoodDishes> {
    return this.dishes.find((dish) => dish.name === name);
  }
  async findById(id: string): Promise<FoodDishes> {
    return this.dishes.find((dish) => dish.id === id);
  }
  async delete(id: string): Promise<void> {
    const findIndex = this.dishes.findIndex((dish) => dish.id === id);
    this.dishes.splice(findIndex, 1);
  }
}

export { FoodDishesFakerRepository };
