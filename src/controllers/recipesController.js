import {
  getRecipes,
  createRecipe,
  getOwnRecipes,
} from '../services/recipesService.js';

import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { getEnvVar } from '../utils/getEnvVar.js';
import { postDeleteFavorite } from '../services/recipesService.js';

export const getOwnRecipesController = async (req, res) => {
  try {
    const ownerId = req.user.id; // Отримуємо ownerId з authenticate middleware
    const recipes = await getOwnRecipes(ownerId);
    res.json({ status: 'success', data: recipes });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

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

export const getMineRecipesController = () => {};

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
