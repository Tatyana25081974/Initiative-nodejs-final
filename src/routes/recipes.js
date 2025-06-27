import { Router } from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  postAddFavoriteController,
  deleteOwnRecipeController,
} from '../controllers/recipesController.js';

import { isValidId } from '../middlewares/isValidID.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

// ✅ Додати рецепт до улюблених
router.post(
  '/addFavorite/:recipeId',
  authenticate,
  isValidId,
  ctrlWrapper(postAddFavoriteController),
);

// ✅ Видалити власний рецепт
router.delete(
  '/own/:recipeId',
  authenticate,
  isValidId,
  ctrlWrapper(deleteOwnRecipeController),
);

export default router;
