import { Recipe } from '../db/models/recipeModel.js';
import { UsersCollection } from '../db/models/userModel.js';

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

export const postDeleteFavorite = async (userId, recipeId) => {
  const result = await UsersCollection.updateOne(
    { _id: userId },
    { $pull: { favorites: recipeId } },
  );

  return result.modifiedCount;
};
