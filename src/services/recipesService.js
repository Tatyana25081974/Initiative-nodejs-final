import Recipe from '../models/recipeModel.js';

export const getOwnRecipes = async (ownerId) => {
  try {
    const recipes = await Recipe.find({ ownerId }).lean();
    return recipes;
  } catch (error) {
    throw new Error('Failed to fetch recipes');
  }
};import { Recipe } from '../db/models/recipeModel.js';

export const getRecipes = async (page, perPage) => {
  const recipes = Recipe.findOne({});

  return recipes;
};

export const getRecipeById = () => {};

export const deleteRecipe = () => {};

export const createRecipe = () => {};

export const getMineRecipes = () => {};

export const getFavoriteRecipes = () => {};

export const postAddFavorite = () => {};

export const postDeleteFavorite = () => {};
