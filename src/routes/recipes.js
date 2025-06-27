import { Router } from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  postAddFavoriteController,
  deleteOwnRecipeController,
  getFavoriteRecipesController, // <-- додали
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

// ✅ Отримати список улюблених рецептів
router.get(
  '/favoriteRecipes',
  authenticate,
  ctrlWrapper(getFavoriteRecipesController),
);

// ✅ Видалити власний рецепт
router.delete(
  '/own/:recipeId',
  authenticate,
  isValidId,
  ctrlWrapper(deleteOwnRecipeController),
);

export default router;
