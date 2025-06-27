import { Recipe } from '../db/models/recipeModel.js';
import createHttpError from 'http-errors';

//Отримати список улюблених рецептів для авторизованого користувача
export const getFavoriteRecipes = async (userId) => {
  const recipes = await Recipe.find({
    favorites: userId,
  });

  return recipes;
};
//Додати рецепт в улюблені

export const addToFavorites = async (userId, recipeId) => {
  const recipe = await Recipe.findById(recipeId);

  if (!recipe) {
    throw createHttpError(404, 'Recipe not found');
  }

  const isAlreadyFavorite = recipe.favorites.includes(userId);

  if (isAlreadyFavorite) {
    throw createHttpError(409, 'Recipe already in favorites');
  }

  recipe.favorites.push(userId);
  await recipe.save();

  return recipe;
};
export const deleteOwnRecipe = async (recipeId, userId) => {
  const recipe = await Recipe.findById(recipeId);

  if (!recipe) {
    throw createHttpError(404, 'Recipe not found');
  }

  if (!recipe.ownerId.equals(userId)) {
    throw createHttpError(403, 'You can delete only your own recipes');
  }

  await Recipe.deleteOne({ _id: recipeId });
};
