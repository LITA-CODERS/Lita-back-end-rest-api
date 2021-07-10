import { Router } from 'express';

import { CreateUserController } from '@modules/accounts/useCases/createUser/CreateUserController';
import { DeleteUserController } from '@modules/accounts/useCases/deleteUser/DeleteUserController';
import { FindUserByEmailUseController } from '@modules/accounts/useCases/findUserByEmail/FindUserByEmailController';
import { ListUsersController } from '@modules/accounts/useCases/listUsers/ListUsersController';
import { UpdateUserController } from '@modules/accounts/useCases/updateUser/UpdateUserController';

const UserRouter = Router();

const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();
const updateUserController = new UpdateUserController();
const findUserByEmailUseController = new FindUserByEmailUseController();
const deleteUserController = new DeleteUserController();
UserRouter.post('/users', createUserController.handle);
UserRouter.get('/users', listUsersController.handle);
UserRouter.get('/user/email/:email', findUserByEmailUseController.handle);
UserRouter.put('/user/:id', updateUserController.handle);
UserRouter.delete('/user/:id', deleteUserController.handle);
export { UserRouter };
