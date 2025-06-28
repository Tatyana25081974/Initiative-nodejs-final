import { json, Router } from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getRecipesController,
  getRecipeByIdController,
  deleteRecipeController,
  createRecipeController,
  getMineRecipesController,
  getFavoriteRecipesController,
  postAddFavoriteController,
  postDeleteFavoriteController,
} from '../controllers/recipesController.js';

import { validateBody } from '../middlewares/validateBody.js';
import { createRecipeSchema } from '../validations/recipeValidation.js';

import { isValidId } from '../middlewares/isValidID.js';

// import { upload } from '../middlewares/multer.js';

import { authenticate } from '../middlewares/authenticate.js';

const router = Router();
const jsonParser = json();

router.get('/', ctrlWrapper(getRecipesController));

router.get('/:recipeId', isValidId, ctrlWrapper(getRecipeByIdController));

router.delete(
  '/:recipeId',
  authenticate,
  isValidId,
  ctrlWrapper(deleteRecipeController),
);

router.post(
  '/',
  authenticate,
  jsonParser,
  // upload.single('photo'),
  validateBody(createRecipeSchema),
  ctrlWrapper(createRecipeController),
);

router.get('/mineRecipes', ctrlWrapper(getMineRecipesController));

router.get('/favoriteRecipes', ctrlWrapper(getFavoriteRecipesController));

router.post(
  '/addFavorite/:recipeId',
  authenticate,
  isValidId,
  ctrlWrapper(postAddFavoriteController),
);

router.post(
  '/deleteFavorite/:recipeId',
  authenticate,
  isValidId,
  ctrlWrapper(postDeleteFavoriteController),
);

export default router;
