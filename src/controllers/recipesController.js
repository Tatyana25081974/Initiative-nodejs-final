import createHttpError from 'http-errors';
import { UsersCollection } from '../db/models/userModel.js';
import {
  getRecipes,
  postAddFavorite,
} from '../services/recipesService.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';

export const getRecipesController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);

  const data = await getRecipes(page, perPage);

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data,
  });
};

export const getRecipeByIdController = () => {};

export const deleteRecipeController = () => {};

export const createRecipeController = () => {};

export const getMineRecipesController = () => {};

export const getFavoriteRecipesController = () => {};

export const postAddFavoriteController = async (req, res) => {
  try {
    const { recipeId } = req.body;
    const userId = req.user._id;
    const result = await UsersCollection.updateOne(
      { _id: userId },
      { $addToSet: { favoriteRecipes: recipeId } },
    );
    if (result.matchedCount === 0) {
      throw createHttpError(404, 'User not Found');
    }
    const wasAdded = result.modifiedCount > 0;

    res.json({
      status: 200,
      message: wasAdded
        ? 'Recipe added to favorites'
        : 'Recipe was already in favorites',
    });
  } catch (error) {
    next(error);
  }
};

export const postDeleteFavoriteController = () => {};
