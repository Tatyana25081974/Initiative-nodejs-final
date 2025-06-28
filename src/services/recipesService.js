import { Recipe } from '../db/models/recipeModel.js';
import { Ingredient } from '../db/models/ingredientModel.js';
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

export const getRecipeById = () => {};

export const deleteRecipe = () => {};

export const createRecipe = () => {};

export const getMineRecipes = () => {};

export const getFavoriteRecipes = () => {};

export const postAddFavorite = () => {};

export const postDeleteFavorite = () => {};
