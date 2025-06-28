import { Recipe } from '../db/models/recipeModel.js'; // Стандартизовано за стилем main

export const getOwnRecipes = async (ownerId) => {
  try {
    const recipes = await Recipe.find({ ownerId }).lean();
    return recipes;
  } catch (err) {
    throw new Error('Failed to fetch recipes: ' + err.message);
  }
};

export const getRecipes = async (page, perPage) => {
  try {
    const recipes = await Recipe.find({})
      .skip((page - 1) * perPage)
      .limit(perPage)
      .lean();
    return recipes;
  } catch (err) {
    throw new Error('Failed to fetch recipes: ' + err.message);
  }
};

export const getRecipeById = () => {};

export const deleteRecipe = () => {};

export const createRecipe = () => {};

export const getMineRecipes = () => {};

export const getFavoriteRecipes = () => {};

export const postAddFavorite = () => {};

export const postDeleteFavorite = () => {};
