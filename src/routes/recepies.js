import { json, Router } from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getRecepiesController,
  // getRecepieByIdController,
  // deleteRecepieController,
  // createRecepieController,
  // getMineRecepiesController,
  postAddFavoriteController,
  // postDeleteFavoriteController,
  // getFavoriteRecipesController,
} from '../controllers/recipesController.js';
import { isFavoritValidation } from '../validations/isFavoritValidation.js';
import { isValidId } from '../middlewares/isValidID.js';
import { validateBody } from '../middlewares/validateBody.js';

// import { validateBody } from '../middlewares/validateBody.js';
// import { createRecipeSchema } from '../validations/recipeValidation.js';

// import { isValidId } from '../middlewares/isValidID.js';

// import { upload } from '../middlewares/multer.js';

// * Перенесений в індекс раути
// import { authenticate } from '../middlewares/authenticate.js';

const router = Router();
const jsonParser = json();

// * Перенесений в індекс раути
// router.use(authenticate);

// router.get('/mineRecepies', ctrlWrapper(getMineRecepiesController));
// router.get('/favoriteRecipes', ctrlWrapper(getFavoriteRecipesController));

router.get('/', ctrlWrapper(getRecepiesController));

// router.get(
//   '/:recepieId',
//   isValidId,
//   ctrlWrapper(getRecepieByIdController),
// );

// router.delete(
//   '/:recepieId',
//   isValidId,
//   ctrlWrapper(deleteRecepieController),
// );

// router.post(
//   '/',
//   jsonParser,
//   validateBody(createRecipeSchema),
//   ctrlWrapper(createRecepieController),
// );

router.post(
  '/addFavorite',
  validateBody(isFavoritValidation),
  ctrlWrapper(postAddFavoriteController),
);

// router.post(
//   '/deleteFavorite/:recepieId',
//   isValidId,
//   ctrlWrapper(postDeleteFavoriteController),
// );

export default router;
