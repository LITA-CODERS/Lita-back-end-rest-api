import { ICreateCategoriesDTO } from '../dtos/ICreateCategories';
import { Categories } from '../infra/typeorm/entities/Categories';

interface ICategoriesRepository {
  create(data: ICreateCategoriesDTO): Promise<Categories>;
  findAll(): Promise<Categories[]>;
  findById(id: string): Promise<Categories>;
  delete(id: string): Promise<void>;
}

export { ICategoriesRepository };
