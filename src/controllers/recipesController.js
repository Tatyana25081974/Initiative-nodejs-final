import {
  createRecipe,
  getOwnRecipes,
  postDeleteFavorite,
} from '../services/recipesService.js';

import { getEnvVar } from '../utils/getEnvVar.js';

import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';

export const getRecipesController = () => {};

export const getRecipeByIdController = () => {};

export const deleteRecipeController = () => {};

export const createRecipeController = async (req, res, next) => {
  try {
    const photo = req.file;
    let photoUrl;

    if (photo) {
      const useCloudinary = getEnvVar('ENABLE_CLOUDINARY') === 'true';
      photoUrl = useCloudinary
        ? await saveFileToCloudinary(photo)
        : await saveFileToUploadDir(photo);
    }

    const { name, description, cookiesTime, cals, category, instruction } =
      req.body;
    const ingredients = JSON.parse(req.body.ingredients);

    const recipe = await createRecipe({
      name,
      description,
      cookiesTime,
      cals,
      category,
      instruction,
      recipeImg: photoUrl,
      ingredients,
      ownerId: req.user._id,
    });

    res.status(201).json(recipe);
  } catch (error) {
    next(error);
  }
};

export const getOwnRecipesController = async (req, res) => {
  const ownerId = req.user._id;
  const recipes = await getOwnRecipes(ownerId);
  res.status(200).json({
    status: 200,
    message: 'Successfully found own recipes',
    data: recipes,
  });
};

export const getFavoriteRecipesController = () => {};

export const postAddFavoriteController = () => {};

export const postDeleteFavoriteController = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { recipeId } = req.params;

    await postDeleteFavorite(userId, recipeId);

    res
      .status(200)
      .json({ status: 200, message: 'Recipe removed from favorites' });
  } catch (error) {
    next(error);
  }
};
