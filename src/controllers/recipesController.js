import createHttpError from 'http-errors';

import {
  getRecipeById,
  createRecipe,
  getOwnRecipes,
  postAddFavorite,
  postDeleteFavorite,
  getFavoriteRecipes,
  deleteOwnRecipe,
} from '../services/recipesService.js';

import { getEnvVar } from '../utils/getEnvVar.js';

import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';

export const getRecipesController = () => {};

export const getRecipeByIdController = async (req, res) => {
  const { recipeId } = req.params;

  const recipe = await getRecipeById(recipeId);

  if (!recipe) {
    throw createHttpError(404, 'Recipe not found!');
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found recipe with id ${recipeId}!`,
    data: recipe,
  });
};

export const deleteOwnRecipeController = async (req, res) => {
  const { recipeId } = req.params;
  const userId = req.user._id;

  await deleteOwnRecipe(recipeId, userId);

  res.status(204).send();
};

export const createRecipeController = async (req, res, next) => {
  try {
    const photo = req.file;
    let photoUrl;

    if (photo) {
      const useCloudinary = getEnvVar('ENABLE_CLOUDINARY') === 'true';
      photoUrl = useCloudinary
        ? await saveFileToCloudinary(photo)
        : await saveFileToUploadDir(photo);
    }

    const { name, description, cookiesTime, cals, category, instruction } =
      req.body;
    const ingredients = JSON.parse(req.body.ingredients);

    const recipe = await createRecipe({
      name,
      description,
      cookiesTime,
      cals,
      category,
      instruction,
      recipeImg: photoUrl,
      ingredients,
      ownerId: req.user._id,
    });

    res.status(201).json(recipe);
  } catch (error) {
    next(error);
  }
};

export const getOwnRecipesController = async (req, res) => {
  const ownerId = req.user._id;
  const recipes = await getOwnRecipes(ownerId);
  res.status(200).json({
    status: 200,
    message: 'Successfully found own recipes',
    data: recipes,
  });
};

export const getFavoriteRecipesController = async (req, res) => {
  const { _id } = req.user;
  const recipes = await getFavoriteRecipes(_id);
  res.status(200).json({
    status: 200,
    message: 'Successfully fetched favorite recipes',
    data: recipes,
  });
};

export const postAddFavoriteController = async (req, res) => {
  const userId = req.user._id;
  const { recipeId } = req.params;

  const result = await postAddFavorite(userId, recipeId);

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
};

export const postDeleteFavoriteController = async (req, res, next) => {
  const userId = req.user._id;
  const { recipeId } = req.params;

  await postDeleteFavorite(userId, recipeId);

  res
    .status(200)
    .json({ status: 200, message: 'Recipe removed from favorites' });
};
