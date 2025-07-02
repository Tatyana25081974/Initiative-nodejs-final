import { Router, json } from 'express';
import {
  getRecipesController,
  getRecipeByIdController,
  deleteRecipeController,
  createRecipeController,
  getMineRecipesController,
  getFavoriteRecipesController,
  postAddFavoriteController,
  postDeleteFavoriteController,
  getOwnRecipesController,
} from '../controllers/recipesController.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createRecipeSchema } from '../validations/recipeValidation.js';
import { isValidId } from '../middlewares/isValidID.js';

import { upload } from '../middlewares/multer.js';

import { authenticate } from '../middlewares/authenticate.js';

const router = Router();
const jsonParser = json();

/**
 * @swagger
 * /recipes:
 *   get:
 *     summary: Retrieve a list of user's own recipes
 *     description: See docs/openapi.yaml for details
 *     $ref: '#/paths/~1recipes/get'
 */
router.get('/recipes', authenticate, getOwnRecipesController);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retrieve a list of all recipes
 *     description: See docs/openapi.yaml for details
 *     $ref: '#/paths/~1/get'
 */
router.get('/', ctrlWrapper(getRecipesController));

/**
 * @swagger
 * /{recipeId}:
 *   get:
 *     summary: Retrieve a specific recipe by ID
 *     description: See docs/openapi.yaml for details
 *     $ref: '#/paths/~1{recipeId}/get'
 */
router.get('/:recipeId', isValidId, ctrlWrapper(getRecipeByIdController));

/**
 * @swagger
 * /{recipeId}:
 *   delete:
 *     summary: Delete a specific recipe by ID
 *     description: See docs/openapi.yaml for details
 *     $ref: '#/paths/~1{recipeId}/delete'
 */
router.delete(
  '/:recipeId',
  authenticate,
  isValidId,
  ctrlWrapper(deleteRecipeController),
);

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a new recipe
 *     description: See docs/openapi.yaml for details
 *     $ref: '#/paths/~1/post'
 */
router.post(
  '/',
  authenticate,
  jsonParser,
  upload.single('recipeImg'),
  validateBody(createRecipeSchema),
  ctrlWrapper(createRecipeController),
);

/**
 * @swagger
 * /mineRecipes:
 *   get:
 *     summary: Retrieve a list of user's recipes
 *     description: See docs/openapi.yaml for details
 *     $ref: '#/paths/~1mineRecipes/get'
 */
router.get('/mineRecipes', ctrlWrapper(getMineRecipesController));

/**
 * @swagger
 * /favoriteRecipes:
 *   get:
 *     summary: Retrieve a list of favorite recipes
 *     description: See docs/openapi.yaml for details
 *     $ref: '#/paths/~1favoriteRecipes/get'
 */
router.get('/favoriteRecipes', ctrlWrapper(getFavoriteRecipesController));

/**
 * @swagger
 * /addFavorite/{recipeId}:
 *   post:
 *     summary: Add a recipe to favorites
 *     description: See docs/openapi.yaml for details
 *     $ref: '#/paths/~1addFavorite~1{recipeId}/post'
 */
router.post(
  '/addFavorite/:recipeId',
  authenticate,
  isValidId,
  ctrlWrapper(postAddFavoriteController),
);

/**
 * @swagger
 * /deleteFavorite/{recipeId}:
 *   post:
 *     summary: Remove a recipe from favorites
 *     description: See docs/openapi.yaml for details
 *     $ref: '#/paths/~1deleteFavorite~1{recipeId}/post'
 */
router.post(
  '/deleteFavorite/:recipeId',
  authenticate,
  isValidId,
  ctrlWrapper(postDeleteFavoriteController),
);

export default router;
