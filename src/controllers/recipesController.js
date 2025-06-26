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
