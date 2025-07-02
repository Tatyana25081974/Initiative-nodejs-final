import { Router, json } from 'express';

import { authenticate } from '../middlewares/authenticate.js';
import { isValidId } from '../middlewares/isValidID.js';
import { upload } from '../middlewares/multer.js';

import { validateBody } from '../middlewares/validateBody.js';
import { createRecipeSchema } from '../validations/recipeValidation.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getRecipesController,
  getRecipeByIdController,
  deleteRecipeController,
  createRecipeController,
  getFavoriteRecipesController,
  postAddFavoriteController,
  postDeleteFavoriteController,
  getOwnRecipesController,
} from '../controllers/recipesController.js';

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
  upload.single('recipeImg'),
  validateBody(createRecipeSchema),
  ctrlWrapper(createRecipeController),
);

router.get(
  '/ownRecipes',
  authenticate,
  ctrlWrapper(getOwnRecipesController),
);

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
