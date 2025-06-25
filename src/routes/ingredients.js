import { json, Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { ingredientsController } from '../controllers/ingredients.js';

const router = Router();
const jsonParser = json();
router.get('/', jsonParser, ctrlWrapper(ingredientsController));

export default router;
