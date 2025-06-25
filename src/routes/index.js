import { Router } from 'express';

import authRouter from './auth.js';
import recepiesRouter from './recepies.js';
import categoriesRouter from './categories.js';
import ingredientsRouter from './ingredients.js';               

import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/recepies', authenticate, recepiesRouter);
router.use('/categories', authenticate, categoriesRouter);
router.use('/ingredients', authenticate, ingredientsRouter);

export default router;