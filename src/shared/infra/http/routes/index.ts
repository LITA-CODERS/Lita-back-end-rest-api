import { Router } from 'express';

import { categoriesRouter } from './categories.routes';
import { dishesRoutes } from './dishes.routes';
import { UserRouter } from './user.routes';

const router = Router();

router.use('/accounts', UserRouter);
router.use(dishesRoutes, categoriesRouter);
export { router };
