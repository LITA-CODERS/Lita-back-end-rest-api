import { Router } from 'express';

import { CreateCategoryController } from '@modules/categories/useCases/createCategory/CreateCategoryController';
import { DeleteCategoryController } from '@modules/categories/useCases/deleteCategory/DeleteCategoryController';
import { FindCategoryByIdController } from '@modules/categories/useCases/findCategoryById/FindCategoryByIdController';
import { ListCategoriesController } from '@modules/categories/useCases/listDishes/ListCategoriesController';

const categoriesRouter = Router();

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();
const findCategoryByIdController = new FindCategoryByIdController();
const deleteCategoryController = new DeleteCategoryController();

categoriesRouter.post('/categories', createCategoryController.handle);
categoriesRouter.get('/categories', listCategoriesController.handle);
categoriesRouter.get('/categories/:id', findCategoryByIdController.handle);
categoriesRouter.delete('/categories/:id', deleteCategoryController.handle);

export { categoriesRouter };
