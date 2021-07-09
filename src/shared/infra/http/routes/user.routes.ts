import { Router } from 'express';

import { CreateUserController } from '@modules/accounts/useCases/CreateUser/CreateUserController';

const UserRouter = Router();

const createUserController = new CreateUserController();

UserRouter.post('/users', createUserController.handle);
export { UserRouter };
