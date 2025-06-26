import Recipe from '../models/recipeModel.js';

export const getOwnRecipes = async (ownerId) => {
  try {
    const recipes = await Recipe.find({ ownerId }).lean();
    return recipes;
  } catch (error) {
    throw new Error('Failed to fetch recipes');
  }
};