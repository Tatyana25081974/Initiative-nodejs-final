import { Recipe } from '../db/models/recipeModel.js';
import { UsersCollection } from '../db/models/userModel.js';
import createHttpError from 'http-errors';

export const getRecipes = async (page, perPage) => {
  const recipes = Recipe.findOne({});

  return recipes;
};

export const getRecipeById = () => {};

export const deleteRecipe = () => {};

export const createRecipe = () => {};

export const getMineRecipes = () => {};

export const getFavoriteRecipes = () => {};

export const postAddFavorite = async (userId, recipeId) => {
  const user = await UsersCollection.findById(userId);

  if (!user) {
    throw createHttpError(404, 'User not found');
  }
  const alreadyInFavorites = user.favoriteRecipes?.includes(recipeId);

  if (!alreadyInFavorites) {
    user.favoriteRecipes = [...(user.favoriteRecipes || []), recipeId];
    await user.save();
  }

  return user.favoriteRecipes;
};

export const postDeleteFavorite = () => {};
