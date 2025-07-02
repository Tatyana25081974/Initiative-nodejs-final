import { Recipe } from '../db/models/recipeModel.js'; // Стандартизовано за стилем main

import { UsersCollection } from '../db/models/userModel.js';

export const getRecipes = () => {};

export const getRecipeById = async (recipeId) => {
  return await Recipe.findOne({ _id: recipeId });
};

export const deleteRecipe = () => {};

export const createRecipe = async (payload) => {
  return await Recipe.create(payload);
};

export const getOwnRecipes = async (ownerId) => {
  return await Recipe.find({ ownerId });
};

export const getFavoriteRecipes = () => {};

export const postAddFavorite = () => {};

export const postDeleteFavorite = async (userId, recipeId) => {
  const result = await UsersCollection.updateOne(
    { _id: userId },
    { $pull: { favorites: recipeId } },
  );

  return result.modifiedCount;
};
