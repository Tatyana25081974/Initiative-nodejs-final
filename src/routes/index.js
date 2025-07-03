import { Router } from 'express';

import authRouter from './auth.js';
import usersRouter from './user.js';
import recipesRouter from './recipes.js';
import categoriesRouter from './categories.js';
import ingredientsRouter from './ingredients.js';

const router = Router();

router.use('/api/auth', authRouter);
router.use('/api/users', usersRouter);
router.use('/api/recipes', recipesRouter);
router.use('/api/categories', categoriesRouter);
router.use('/api/ingredients', ingredientsRouter);

export default router;
