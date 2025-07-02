import { UsersCollection } from '../db/models/userModel.js';

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
