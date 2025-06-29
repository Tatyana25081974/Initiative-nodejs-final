import { getRecipes } from '../services/recipesService.js';
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

export const postAddFavoriteController = async (req, res) => {
  const { recipeId } = req.body;
  const userId = req.user._id;
  const favoriteRecipes = await postAddFavorite(userId, recipeId);

  res.json({
    status: 200,
    message: 'Recipe added to favorites',
    data: { favoriteRecipes },
  });
};

export const postDeleteFavoriteController = () => {};
