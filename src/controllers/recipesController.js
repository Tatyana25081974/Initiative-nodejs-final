import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

import createHttpError from 'http-errors';

import {
  getRecipes,
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

export const getRecipesController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);

  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  const recipes = await getRecipes({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });

  if (!recipes) {
    res.status(404).json({ status: 404, message: 'Not found!' });
    return;
  }
  res.status(200).json({
    status: 200,
    message: 'Successfully found recipes!',
    data: recipes,
  });
};

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

export const createRecipeController = async (req, res) => {
  const photo = req.file;
  let photoUrl;

  // Обробка зображення
  if (photo) {
    const useCloudinary = getEnvVar('ENABLE_CLOUDINARY') === 'true';
    photoUrl = useCloudinary
      ? await saveFileToCloudinary(photo)
      : await saveFileToUploadDir(photo);
  }

  const {
    title,
    description,
    time,
    cals,
    category,
    instructions,
    ingredients,
  } = req.body;

  const newRecipe = await createRecipe({
    title,
    description,
    time,
    cals,
    category,
    instructions,
    thumb: photoUrl,
    ingredients,
    owner: req.user._id,
  });

  res.status(201).json({
    status: 201,
    message: 'Successfully created new recipe',
    data: newRecipe,
  });
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
    message: 'Successfully found favorite recipes',
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
