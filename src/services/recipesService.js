import { Recipe } from '../db/models/recipeModel.js';

export const addFavorite = async (recipesId, isFavorite) => {
  const result = await Recipe.findOneAndUpdate(
    { _id: recipesId },
    { isFavorite },
    { new: true },
  );
  return result;
};
