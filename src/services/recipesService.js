<<<<<<< Updated upstream
import createHttpError from 'http-errors';

import { Recipe } from '../db/models/recipeModel.js';
import { Ingredient } from '../db/models/ingredientModel.js';
=======
import { Recipe } from '../db/models/recipeModel.js';
>>>>>>> Stashed changes
import { UsersCollection } from '../db/models/userModel.js';

import { SORT_ORDER } from '../constants/index.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getRecipes = async ({
  page = 1,
  perPage = 12,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
  userId,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const query = {};

  if (filter.category) {
    query.category = filter.category;
  }

  if (filter.area) {
    query.area = filter.area;
  }

  if (filter.search) {
    query.title = { $regex: filter.search, $options: 'i' };
  }

  if (filter.ingredient) {
    const found = await Ingredient.findOne({ name: filter.ingredient });

    if (found) {
      query['ingredients.id'] = String(found._id);
      // console.log('Ingredient _id:', found._id.toString());
      // console.log('Query:', query);
    } else {
      return {
        data: [],
        page,
        perPage,
        totalItems: 0,
        totalPages: 0,
        hasNextPage: false,
        hasPreviousPage: false,
      };
    }
  }

  // console.log('FILTER DEBUG:', query);

  const [recipesCount, recipes] = await Promise.all([
    Recipe.countDocuments(query),
    Recipe.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calculatePaginationData(
    recipesCount,
    perPage,
    page,
  );
  return {
    data: recipes,
    ...paginationData,
  };
};

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
