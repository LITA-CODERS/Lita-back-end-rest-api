import { Router } from 'express';

import { AuthenticateUserController } from '@modules/accounts/useCases/authenticateUser/AuthenticateUserController';
import { CreateUserController } from '@modules/accounts/useCases/createUser/CreateUserController';
import { DeleteUserController } from '@modules/accounts/useCases/deleteUser/DeleteUserController';
import { FindUserByEmailUseController } from '@modules/accounts/useCases/findUserByEmail/FindUserByEmailController';
import { FindUserByIdUseController } from '@modules/accounts/useCases/findUserById/FindUserByIdController';
import { ListUsersController } from '@modules/accounts/useCases/listUsers/ListUsersController';
import { UpdateUserController } from '@modules/accounts/useCases/updateUser/UpdateUserController';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const UserRouter = Router();

const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();
const updateUserController = new UpdateUserController();
const findUserByEmailUseController = new FindUserByEmailUseController();
const findUserByIdUseController = new FindUserByIdUseController();
const deleteUserController = new DeleteUserController();
const authenticateUserController = new AuthenticateUserController();
UserRouter.post('/users', createUserController.handle);
UserRouter.get('/users', ensureAuthenticated, listUsersController.handle);
UserRouter.get(
  '/user/email/:email',
  ensureAuthenticated,
  findUserByEmailUseController.handle
);
UserRouter.get(
  '/user/:id',
  ensureAuthenticated,
  findUserByIdUseController.handle
);
UserRouter.put('/user/:id', ensureAuthenticated, updateUserController.handle);
UserRouter.delete(
  '/user/:id',
  ensureAuthenticated,
  deleteUserController.handle
);
UserRouter.post('/login', authenticateUserController.handle);
export { UserRouter };
