import {
  getRecipes,
  postDeleteFavorite,
} from '../services/recipesService.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';

export const getRecipesController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);

  const data = await getRecipes(page, perPage);

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data,
  });
};

export const getRecipeByIdController = () => {};

export const deleteRecipeController = () => {};

export const createRecipeController = () => {};

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
