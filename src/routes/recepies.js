import { json, Router } from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getRecepiesController,
  getRecepieByIdController,
  deleteRecepieController,
  createRecepieController,
  getMineRecepiesController,
  postAddFavoriteController,
  postDeleteFavoriteController,
  getFavoriteRecipesController,
} from '../controllers/recipes.js';

import { validateBody } from '../middlewares/validateBody.js';
import { createRecepieSchema } from '../validation/contacts.js';

import { isValidId } from '../middlewares/isValidId.js';

// import { upload } from '../middlewares/multer.js';

// * Перенесений в індекс раути
// import { authenticate } from '../middlewares/authenticate.js';

const router = Router();
const jsonParser = json();

// * Перенесений в індекс раути
// router.use(authenticate);

router.get('/', ctrlWrapper(getRecepiesController));

router.get('/:recepieId', isValidId, ctrlWrapper(getRecepieByIdController));

router.delete('/:recepieId', isValidId, ctrlWrapper(deleteRecepieController));

router.post(
  '/',
  jsonParser,
  validateBody(createRecepieSchema),
  ctrlWrapper(createRecepieController),
);

router.get('/mineRecepies', ctrlWrapper(getMineRecepiesController));

router.post(
  '/addFavorite/:recepieId',
  isValidId,
  ctrlWrapper(postAddFavoriteController),
);

router.post(
  '/deleteFavorite/:recepieId',
  isValidId,
  ctrlWrapper(postDeleteFavoriteController),
);

router.get('/favoriteRecipes', ctrlWrapper(getFavoriteRecipesController));

export default router;
