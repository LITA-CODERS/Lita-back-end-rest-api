import { Router } from 'express';

import { CreateDishesController } from '@modules/foodDishes/useCases/createDishes/CreateDishesController';
import { DeleteDishesController } from '@modules/foodDishes/useCases/deleteDishes/DeleteDishesController';
import { FindDisheByIdController } from '@modules/foodDishes/useCases/findDishesById/FindDisheByIdController';
import { ListDishesController } from '@modules/foodDishes/useCases/listDishes/ListDishesController';
import { UpdateDishesController } from '@modules/foodDishes/useCases/updateDishes /UpdateDishesController';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const dishesRoutes = Router();

const createDishesController = new CreateDishesController();
const listDishesController = new ListDishesController();
const findDisheByIdCOntroller = new FindDisheByIdController();
const updateDishesController = new UpdateDishesController();
const deleteDishesController = new DeleteDishesController();

dishesRoutes.post('/dish', ensureAuthenticated, createDishesController.handle);
dishesRoutes.get('/dish', listDishesController.handle);
dishesRoutes.get('/dish/:id', findDisheByIdCOntroller.handle);
dishesRoutes.put(
  '/dish/:id',
  ensureAuthenticated,
  updateDishesController.handle
);
dishesRoutes.delete(
  '/dish/:id',
  ensureAuthenticated,
  deleteDishesController.handle
);

export { dishesRoutes };
