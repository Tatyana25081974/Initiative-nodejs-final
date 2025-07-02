
import { Recipe } from '../db/models/recipeModel.js'; // Стандартизовано за стилем main

import { UsersCollection } from '../db/models/userModel.js';

export const getOwnRecipes = async (ownerId) => {
  try {
    const recipes = await Recipe.find({ ownerId }).lean();
    return recipes;
  } catch (err) {
    throw new Error('Failed to fetch recipes: ' + err.message);
  }
};

export const getRecipes = () => {};

export const getRecipeById = () => {};

export const deleteRecipe = () => {};

export const createRecipe = async (payload) => {
  return await Recipe.create(payload);
};

export const getMineRecipes = () => {};

export const getFavoriteRecipes = () => {};

export const postAddFavorite = () => {};

export const postDeleteFavorite = async (userId, recipeId) => {
  const result = await UsersCollection.updateOne(
    { _id: userId },
    { $pull: { favorites: recipeId } },
  );

  return result.modifiedCount;
};
