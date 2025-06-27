import { Recipe } from "../db/models/recipeModel.js";

export const getRecipes = () => {};

export const getRecipeById = async (recipeId) => {
    return await Recipe.findOne({ _id: recipeId });
};

export const deleteRecipe = () => {};

export const createRecipe = () => {};

export const getMineRecipes = () => {};

export const getFavoriteRecipes = () => {};

export const postAddFavorite = () => {};

export const postDeleteFavorite = () => {};
