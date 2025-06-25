import { json, Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { categoriesController } from '../controllers/categories.js';

const router = Router();
const jsonParser = json();
router.get('/', jsonParser, ctrlWrapper(categoriesController));

export default router;
