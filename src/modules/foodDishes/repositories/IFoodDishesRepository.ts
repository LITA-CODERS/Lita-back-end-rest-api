import { ICreateFoodDishesDTO } from '../dtos/ICreateFoodDishes';
import { IUpdateFoodDishesDTO } from '../dtos/IUpdateFoodDishesDTO';
import { FoodDishes } from '../infra/typeorm/entities/FoodDishes';

interface IFoodDishesRepository {
  create(data: ICreateFoodDishesDTO): Promise<FoodDishes>;
  update(id: string, data: IUpdateFoodDishesDTO): Promise<void>;
  findAll(): Promise<FoodDishes[]>;
  findByName(name: string): Promise<FoodDishes>;
  findById(id: string): Promise<FoodDishes>;
  delete(id: string): Promise<void>;
}

export { IFoodDishesRepository };
