import {
  createRecipe,
  deleteRecipe,
  getFavoriteRecipes,
  getMineRecipes,
  getRecipeById,
  getRecipes,
  postAddFavorite,
  postDeleteFavorite,
} from '../services/recipes.js';

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

export const getRecipeByIdController = (req, res, next) => {
  getRecipeById();
};

export const deleteRecipeController = (req, res, next) => {
  deleteRecipe();
};

export const createRecipeController = (req, res, next) => {
  createRecipe();
};

export const getMineRecipesController = (req, res, next) => {
  getMineRecipes();
};

export const postDeleteFavoriteController = (req, res, next) => {
  getFavoriteRecipes();
};

export const getFavoriteRecipesController = (req, res, next) => {
  postAddFavorite();
};

export const postAddFavoriteController = (req, res, next) => {
  postDeleteFavorite();
};
export const getRecepiesController = () => {};
