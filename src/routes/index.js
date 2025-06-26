import { Router } from 'express';

import authRouter from './auth.js';
import recepiesRouter from './recepies.js';
import categoriesRouter from './categories.js';
import ingredientsRouter from './ingredients.js';

import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.use('/api/auth', authRouter);
router.use('/api/recepies', authenticate, recepiesRouter);
router.use('/api/categories', authenticate, categoriesRouter);
router.use('/api/ingredients', authenticate, ingredientsRouter);

export default router;
