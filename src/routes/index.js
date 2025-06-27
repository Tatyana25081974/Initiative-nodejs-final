import { Router } from 'express';

import authRouter from './auth.js';
import recipesRouter from './recepies.js';
import categoriesRouter from './categories.js';
import ingredientsRouter from './ingredients.js';

const router = Router();

router.use('/api/auth', authRouter);
router.use('/api/recipes', recipesRouter);
router.use('/api/categories', categoriesRouter);
router.use('/api/ingredients', ingredientsRouter);

export default router;
