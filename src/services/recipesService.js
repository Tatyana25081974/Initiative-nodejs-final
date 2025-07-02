import { Recipe } from '../db/models/recipeModel.js';
import { UsersCollection } from '../db/models/userModel.js';
import createHttpError from 'http-errors';

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

export const postAddFavorite = (userId, recipeId) => {
  return await UsersCollection.updateOne(
      { _id: userId },
      { $addToSet: { favoriteRecipes: recipeId } },
    );
};

export const postDeleteFavorite = async (userId, recipeId) => {
  const result = await UsersCollection.updateOne(
    { _id: userId },
    { $pull: { favorites: recipeId } },
  );

  return result.modifiedCount;
};
