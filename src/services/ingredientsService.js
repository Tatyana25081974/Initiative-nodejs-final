import { Ingredient } from '../db/models/ingredientModel.js';

export const getAllIngredients = async () => {
  return await Ingredient.find().sort({ name: 1 });
};
