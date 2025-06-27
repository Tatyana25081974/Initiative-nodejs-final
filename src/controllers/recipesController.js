import { addToFavorites } from '../services/recipesService.js';
import { deleteOwnRecipe } from '../services/recipesService.js';
import { getFavoriteRecipes } from '../services/recipesService.js';

export const postAddFavoriteController = async (req, res) => {
  const userId = req.user._id;
  const { recipeId } = req.params;

  const updatedRecipe = await addToFavorites(userId, recipeId);

  res.status(200).json({
    status: 200,
    message: 'Recipe added to favorites',
    data: updatedRecipe,
  });
};

export const getFavoriteRecipesController = async (req, res) => {
  const userId = req.user._id;

  const recipes = await getFavoriteRecipes(userId);

  res.status(200).json({
    status: 200,
    message: 'Successfully fetched favorite recipes',
    data: recipes,
  });
};

export const deleteOwnRecipeController = async (req, res) => {
  const { recipeId } = req.params;
  const userId = req.user._id;

  await deleteOwnRecipe(recipeId, userId);

  res.status(204).send();
};
