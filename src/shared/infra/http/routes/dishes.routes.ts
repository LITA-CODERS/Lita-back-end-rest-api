import { Router } from 'express';

import { CreateDishesController } from '@modules/foodDishes/useCases/createDishes/CreateDishesController';
import { DeleteDishesController } from '@modules/foodDishes/useCases/deleteDishes/DeleteDishesController';
import { ListDishesController } from '@modules/foodDishes/useCases/listDishes/ListDishesController';
import { UpdateDishesController } from '@modules/foodDishes/useCases/updateDishes /UpdateDishesController';

const dishesRoutes = Router();

const createDishesController = new CreateDishesController();
const listDishesController = new ListDishesController();
const updateDishesController = new UpdateDishesController();
const deleteDishesController = new DeleteDishesController();

dishesRoutes.post('/dish', createDishesController.handle);
dishesRoutes.get('/dish', listDishesController.handle);
dishesRoutes.put('/dish/:id', updateDishesController.handle);
dishesRoutes.delete('/dish/:id', deleteDishesController.handle);
