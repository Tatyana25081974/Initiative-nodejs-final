import { getRecipes } from '../services/recipesService.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';

import { getOwnRecipes } from '../services/recipesService.js';

export const getOwnRecipesController = async (req, res) => {
  try {
    const ownerId = req.user.id; // Отримуємо ownerId з authenticate middleware
    const recipes = await getOwnRecipes(ownerId);
    res.json({ status: 'success', data: recipes });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const getRecipesController = (req, res, next) => {
  getRecipes();
};

export const getRecipeByIdController = () => {};

export const deleteRecipeController = () => {};

export const createRecipeController = () => {};

export const getMineRecipesController = () => {};

export const getFavoriteRecipesController = () => {};

export const postAddFavoriteController = () => {};

export const postAddFavoriteController = (req, res, next) => {
  postDeleteFavorite();
};
export const getRecepiesController = () => {};
