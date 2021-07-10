import { Router } from 'express';

import { CreateUserController } from '@modules/accounts/useCases/CreateUser/CreateUserController';
import { ListUsersController } from '@modules/accounts/useCases/listUsers/ListUsersController';

const UserRouter = Router();

const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();
UserRouter.post('/users', createUserController.handle);
UserRouter.get('/users', listUsersController.handle);
export { UserRouter };
