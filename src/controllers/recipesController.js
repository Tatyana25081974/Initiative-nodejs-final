import createHttpError from 'http-errors';
import { removeFavoriteRecipe } from '../services/recipes.js';

export const getRecepiesController = () => {};

export const deleteFavoriteRecipe = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { recipeId } = req.params;

    const modifiedCount = await removeFavoriteRecipe(userId, recipeId);

    if (modifiedCount === 0) {
      throw createHttpError(404, 'Recipe not found in favorites');
    }

    res
      .status(200)
      .json({ status: 200, message: 'Recipe removed from favorites' });
  } catch (error) {
    next(error);
  }
};
