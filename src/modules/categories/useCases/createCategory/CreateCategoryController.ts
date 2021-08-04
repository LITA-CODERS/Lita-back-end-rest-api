import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCategoryUseCase } from './CreateCategoryUseCase';

interface ICategoriesRequest {
  name: string;
}

class CreateCategoryController {
  async handle(request: Request, response: Response) {
    const { name }: ICategoriesRequest = request.body;

    const createCategoryUseCase = container.resolve(CreateCategoryUseCase);

    const category = await createCategoryUseCase.execute({
      name,
    });
    return response.status(201).json(category);
  }
}

export { CreateCategoryController };
