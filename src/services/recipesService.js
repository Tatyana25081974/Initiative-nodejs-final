import createHttpError from 'http-errors';

import { Recipe } from '../db/models/recipeModel.js';
import { UsersCollection } from '../db/models/userModel.js';

export const getRecipes = () => {};

export const getRecipeById = async (recipeId) => {
  return await Recipe.findOne({ _id: recipeId });
};

export const deleteOwnRecipe = async (recipeId, userId) => {
  const recipe = await Recipe.findById(recipeId);

  if (!recipe) {
    throw createHttpError(404, 'Recipe not found');
  }

  if (!recipe.owner.equals(userId)) {
    throw createHttpError(403, 'You can delete only your own recipes');
  }

  await Recipe.deleteOne({ _id: recipeId });
};

export const createRecipe = async (payload) => {
  return await Recipe.create(payload);
};

export const getOwnRecipes = async (ownerId) => {
  return await Recipe.find({ owner: ownerId });
};

export const getFavoriteRecipes = async (_id) => {
  const user = await UsersCollection.findOne({ _id }).populate(
    'favorites',
  );

  return user.favorites;
};

export const postAddFavorite = async (userId, recipeId) => {
  return await UsersCollection.updateOne(
    { _id: userId },
    { $addToSet: { favorites: recipeId } },
  );
};

export const postDeleteFavorite = async (userId, recipeId) => {
  const result = await UsersCollection.updateOne(
    { _id: userId },
    { $pull: { favorites: recipeId } },
  );

  return result.modifiedCount;
};
