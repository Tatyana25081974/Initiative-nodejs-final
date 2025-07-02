import { Router } from 'express';

import { authenticate } from '../middlewares/authenticate.js';

import authRouter from './auth.js';
import usersRouter from './user.js';
import recipesRouter from './recipes.js';
import categoriesRouter from './categories.js';
import ingredientsRouter from './ingredients.js';

const router = Router();

router.use('/api/auth', authenticate, authRouter);
router.use('/api/users', authenticate, usersRouter);
router.use('/api/recipes', recipesRouter);
router.use('/api/categories', categoriesRouter);
router.use('/api/ingredients', ingredientsRouter);

export default router;
