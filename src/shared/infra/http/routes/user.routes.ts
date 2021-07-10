import { Router } from 'express';

import { CreateUserController } from '@modules/accounts/useCases/createUser/CreateUserController';
import { ListUsersController } from '@modules/accounts/useCases/listUsers/ListUsersController';
import { UpdateUserController } from '@modules/accounts/useCases/updateUser/UpdateUserController';

const UserRouter = Router();

const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();
const updateUserController = new UpdateUserController();
UserRouter.post('/users', createUserController.handle);
UserRouter.get('/users', listUsersController.handle);
UserRouter.put('/users/:id', updateUserController.handle);
export { UserRouter };
